const mongoose = require('mongoose');

module.exports = function dbConnect() {
  const options = {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect('mongodb://localhost/baggins-notes', options);
};
