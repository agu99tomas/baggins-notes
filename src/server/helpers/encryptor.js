const bcrypt = require('bcrypt');

exports.hash = data => bcrypt.hash(data, 10);
exports.compare = (data, encrypted) => bcrypt.compare(data, encrypted);
