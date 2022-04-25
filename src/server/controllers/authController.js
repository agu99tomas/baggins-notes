const User = require('../models/userModel');
const generateOtp = require('../helpers/generateOtp');
const encryptor = require('../helpers/encryptor');
const jwtSign = require('../helpers/jwtSign');
const sendMail = require('../helpers/sendMail');
const validator = require('../validators/authControllerValidator');

/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
  validator.register,
  async (req, res) => {
    try {
      const hash = await encryptor.hash(req.body.password);
      const otp = generateOtp();
      const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;

      await sendMail(req.body.email, 'Confirm Account', html);

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        confirmOTP: otp,
      });

      await user.save();

      const userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return res.successWithData('Registration success', userData);
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
  validator.verifyConfirm,
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
 *
 * @returns {Object}
 */
exports.resendConfirmOtp = [
  validator.resendConfirmOtp,
  async (req, res) => {
    try {
      const query = { email: req.body.email };
      const user = await User.findOne(query);

      if (!user) return res.unauthorized('Specified email not found.');
      if (user.isConfirmed) return res.unauthorized('Account already confirmed.');

      const otp = generateOtp();
      const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;

      await sendMail(req.body.email, 'Confirm Account', html);

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
  validator.login,
  async (req, res) => {
    try {
      const query = { email: req.body.email };
      const user = await User.findOne(query);

      if (!user) return res.unauthorized('Email or Password wrong.');

      const equals = await encryptor.compare(req.body.password, user.password);

      if (!equals) return res.unauthorized('Email or Password wrong.');
      if (!user.isConfirmed) return res.unauthorized('Account is not confirmed. Please confirm your account.');
      if (!user.active) return res.unauthorized('Account is not active. Please contact admin.');

      const userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      userData.token = jwtSign(userData);

      res.successWithData('Login Success', userData);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];
