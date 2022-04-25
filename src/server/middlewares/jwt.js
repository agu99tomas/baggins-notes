const { expressjwt: jwt } = require('express-jwt');

const authenticate = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = authenticate;
