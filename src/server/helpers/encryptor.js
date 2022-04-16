const bcrypt = require('bcrypt');

const saltOrRounds = 10;

const hash = (data, callback) => {
  bcrypt.hash(data, saltOrRounds, callback);
};

const compare = (data, encrypted, callback) => {
  bcrypt.compare(data, encrypted, callback);
};

module.exports = { hash, compare };
