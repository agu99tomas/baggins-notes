const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const oneTimePassword = require('../helpers/oneTimePassword');
const sign = require('../helpers/jwtSign');
const send = require('../helpers/sendEmail');
const {
  register, verifyConfirm, resendConfirmOtp, login,
} = require('../validators/authValidator');
const validate = require('../validators/validate');

/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 * @param {string}      confirmUrl
 *
 * @returns {Object}
 */
exports.register = [
  register,
  validate,
  async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const otp = oneTimePassword();
      const html = `Please Confirm your Account <a href="${req.body.confirmUrl}?otp=${otp}&email=${req.body.email}">Here</a>`;

      await send(req.body.email, 'Confirm Account', html);

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        confirmOTP: otp,
      });

      await user.save();

      const userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return res.success('Registration success', userData);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];

/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyConfirm = [
  verifyConfirm,
  validate,
  async (req, res) => {
    try {
      const query = { email: req.body.email };
      const user = await User.findOne(query);

      if (!user) return res.unauthorized('Specified email not found.');
      if (user.isConfirmed) return res.unauthorized('Account already confirmed.');
      if (user.confirmOTP !== req.body.otp) return res.unauthorized('Otp does not match');

      await User.findOneAndUpdate(query, {
        isConfirmed: 1,
        confirmOTP: null,
      });

      res.success('Account confirmed success.');
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 * @param {string}      confirmUrl
 *
 * @returns {Object}
 */
exports.resendConfirmOtp = [
  resendConfirmOtp,
  validate,
  async (req, res) => {
    try {
      const query = { email: req.body.email };
      const user = await User.findOne(query);

      if (!user) return res.unauthorized('Specified email not found.');
      if (user.isConfirmed) return res.unauthorized('Account already confirmed.');

      const otp = oneTimePassword();
      const html = `Please Confirm your Account <a href="${req.body.confirmUrl}?otp=${otp}&email=${req.body.email}">Here</a>`;

      await send(req.body.email, 'Confirm Account', html);

      await User.findOneAndUpdate(query, {
        isConfirmed: 0,
        confirmOTP: otp,
      });

      res.success('Confirm otp sent.');
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
  login,
  validate,
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.unauthorized('Email or Password wrong.');

      const equals = await bcrypt.compare(req.body.password, user.password);

      if (!equals) return res.unauthorized('Email or Password wrong.');
      if (!user.isConfirmed) return res.unauthorized('Account is not confirmed. Please confirm your account.');
      if (!user.active) return res.unauthorized('Account is not active. Please contact admin.');

      const userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        initials: user.firstName.charAt(0) + user.lastName.charAt(0),
      };
      userData.token = sign(userData);

      res.success('Login Success', userData);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];
