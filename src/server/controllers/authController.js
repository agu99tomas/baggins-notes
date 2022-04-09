const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const otpGenerator = require('../helpers/otpGenerator');
const mailer = require('../helpers/mailer');
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
  (req, res) => {
    try {
      bcrypt.hash(req.body.password, 10, (_err, hash) => {
        const otp = otpGenerator.generate(4);
        const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;
        mailer
          .send(
            req.body.email,
            'Confirm Account',
            html,
          )
          .then(() => {
            const user = new UserModel({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              confirmOTP: otp,
            });

            user.save((err) => {
              if (err) return res.serverError(err);

              const userData = {
                // eslint-disable-next-line no-underscore-dangle
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              };

              return res.successWithData('Registration success', userData);
            });
          })
          .catch(err => res.serverError(err));
      });
    } catch (err) {
      return res.serverError(res, err);
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
  (req, res) => {
    try {
      const query = { email: req.body.email };
      UserModel.findOne(query).then((user) => {
        if (!user) return res.unauthorized('Specified email not found.');
        if (user.isConfirmed) return res.unauthorized('Account already confirmed.');
        if (user.confirmOTP !== req.body.otp) return res.unauthorized('Otp does not match');

        UserModel.findOneAndUpdate(query, {
          isConfirmed: 1,
          confirmOTP: null,
        })
          .then(() => res.success('Account confirmed success.'))
          .catch(err => res.serverError(err));
      });
    } catch (err) {
      return res.serverError(err);
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
  (req, res) => {
    try {
      const query = { email: req.body.email };
      UserModel.findOne(query).then((user) => {
        if (!user) return res.unauthorized('Specified email not found.');
        if (user.isConfirmed) return res.unauthorized('Account already confirmed.');

        const otp = otpGenerator.generate(4);
        const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;
        mailer
          .send(
            req.body.email,
            'Confirm Account',
            html,
          )
          .then(() => {
            UserModel.findOneAndUpdate(query, {
              isConfirmed: 0,
              confirmOTP: otp,
            })
              .then(() => res.success('Confirm otp sent.'))
              .catch(err => res.serverError(err));
          });
      });
    } catch (err) {
      return res.serverError(err);
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
  (req, res) => {
    try {
      const query = { email: req.body.email };
      UserModel.findOne(query).then((user) => {
        if (!user) return res.unauthorized('Email or Password wrong.');

        bcrypt.compare(req.body.password, user.password, (_err, equals) => {
          if (!equals) return res.unauthorized('Email or Password wrong.');
          if (!user.isConfirmed) return res.unauthorized('Account is not confirmed. Please confirm your account.');
          if (!user.active) return res.unauthorized('Account is not active. Please contact admin.');

          const userData = {
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
          const payload = userData;
          const options = {
            expiresIn: process.env.JWT_TIMEOUT_DURATION,
          };
          const secret = process.env.JWT_SECRET;
          userData.token = jwt.sign(payload, secret, options);

          res.successWithData('Login Success', userData);
        });
      });
    } catch (err) {
      return res.serverError(res, err);
    }
  },
];
