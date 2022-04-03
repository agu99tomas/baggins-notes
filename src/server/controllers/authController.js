const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const oneTimePassword = require('../helpers/oneTimePassword');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');
const registerValidator = require('../validators/registerValidator');
const verifyConfirmValidator = require('../validators/verifyConfirmValidator');
const resendConfirmOtp = require('../validators/resendConfirmOtpValidator');

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
  registerValidator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.validationErrorWithData('Validation Error', errors.array());
    }

    try {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        const otp = oneTimePassword.generate(4);
        const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;
        mailer
          .send(
            constants.confirmEmails.from,
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

            user.save((error) => {
              if (error) return res.serverError(error);

              const userData = {
                // eslint-disable-next-line no-underscore-dangle
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              };

              return res.successWithData('Registration success', userData);
            });
          });
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
  verifyConfirmValidator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.validationErrorWithData('Validation Error', errors.array());
    }

    try {
      const query = { email: req.body.email };
      UserModel.findOne(query).then((user) => {
        if (!user) return res.unauthorized('Specified email not found.');
        if (user.isConfirmed) return res.unauthorized('Account already confirmed.');
        if (user.confirmOTP !== req.body.otp) return res.unauthorized('Otp does not match');

        UserModel.findOneAndUpdate(query, {
          isConfirmed: 1,
          confirmOTP: null,
        }).then(() => res.success('Account confirmed success.'));
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
  resendConfirmOtp,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.validationErrorWithData('Validation Error', errors.array());
    }

    try {
      const query = { email: req.body.email };
      UserModel.findOne(query).then((user) => {
        if (!user) return res.unauthorized('Specified email not found.');
        if (user.isConfirmed) return res.unauthorized('Account already confirmed.');

        const otp = oneTimePassword.generate(4);
        const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;
        mailer
          .send(
            constants.confirmEmails.from,
            req.body.email,
            'Confirm Account',
            html,
          )
          .then(() => {
            UserModel.findOneAndUpdate(query, {
              isConfirmed: 0,
              confirmOTP: otp,
            }).then(() => res.success('Confirm otp sent.'));
          });
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
];
