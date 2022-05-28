const { body } = require('express-validator');
const UserModel = require('../models/userModel');

exports.login = [
  body('email')
    .notEmpty()
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must be a valid email address.'),
  body('password')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('Password must be specified.'),
];

exports.register = [
  body('firstName')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('lastName')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('Last name must be specified.')
    .isAlphanumeric()
    .withMessage('Last name has non-alphanumeric characters.'),
  body('email')
    .notEmpty()
    .trim()
    .escape()
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
    .escape()
    .withMessage('Password must be 6 characters or greater.'),
];


exports.resendConfirmOtp = [
  body('email')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
];

exports.verifyConfirm = [
  body('email')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('otp')
    .notEmpty()
    .trim()
    .escape()
    .withMessage('OTP must be specified.'),
];
