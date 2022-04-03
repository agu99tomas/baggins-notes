const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const response = require('../helpers/response');
const oneTimePassword = require('../helpers/oneTimePassword');
const mailer = require('../helpers/mailer');
const { constants } = require('../helpers/constants');
const registerValidator = require('../validators/registerValidator');
const verifyConfirmValidator = require('../validators/verifyConfirmValidator');

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
      return response.validationErrorWithData(
        res,
        'Validation Error',
        errors.array(),
      );
    }

    try {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        const otp = oneTimePassword.generate(4);
        const user = new UserModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          confirmOTP: otp,
        });

        const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;

        mailer
          .send(
            constants.confirmEmails.from,
            req.body.email,
            'Confirm Account',
            html,
          )
          .then(() => {
            user.save((error) => {
              if (error) return response.serverError(res, error);

              const userData = {
                // eslint-disable-next-line no-underscore-dangle
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              };

              return response.successWithData(
                res,
                'Registration success',
                userData,
              );
            });
          });
      });
    } catch (err) {
      return response.serverError(res, err);
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
      return response.validationErrorWithData(
        res,
        'Validation Error',
        errors.array(),
      );
    }

    try {
      const query = { email: req.body.email };
      UserModel.findOne(query).then((user) => {
        if (!user) return response.unauthorized(res, 'Specified email not found.');
        if (user.isConfirmed) return response.unauthorized(res, 'Account already confirmed.');
        if (user.confirmOTP !== req.body.otp) return response.unauthorized(res, 'Otp does not match');

        UserModel.findOneAndUpdate(query, {
          isConfirmed: 1,
          confirmOTP: null,
        }).then(() => response.success(res, 'Account confirmed success.'));
      });
    } catch (err) {
      return response.serverError(res, err);
    }
  },
];
