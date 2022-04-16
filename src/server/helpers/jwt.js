const jwt = require('jsonwebtoken');

const options = {
  expiresIn: process.env.JWT_TIMEOUT_DURATION,
};

const secret = process.env.JWT_SECRET;

const sign = payload => jwt.sign(payload, secret, options);

module.exports = { sign };
