const { body, sanitizeBody } = require('express-validator');
const UserModel = require('../models/userModel');

exports.login = [
  body('email')
    .notEmpty()
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password')
    .notEmpty()
    .trim()
    .withMessage('Password must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
];

exports.register = [
  body('firstName')
    .notEmpty()
    .trim()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('lastName')
    .notEmpty()
    .trim()
    .withMessage('Last name must be specified.')
    .isAlphanumeric()
    .withMessage('Last name has non-alphanumeric characters.'),
  body('email')
    .notEmpty()
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .custom(value => UserModel.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject(new Error('E-mail already in use'));
      }
    })),
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.'),
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
];


exports.resendConfirmOtp = [
  body('email')
    .notEmpty()
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  sanitizeBody('email').escape(),
];

exports.verifyConfirm = [
  body('email')
    .notEmpty()
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('otp')
    .notEmpty()
    .trim()
    .withMessage('OTP must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('otp').escape(),
];
