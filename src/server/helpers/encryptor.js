const bcrypt = require('bcrypt');

const hash = (data, callback, saltOrRounds = 10) => {
  bcrypt.hash(data, saltOrRounds, callback);
};

const compare = (data, encrypted, callback) => {
  bcrypt.compare(data, encrypted, callback);
};

module.exports = { hash, compare };
