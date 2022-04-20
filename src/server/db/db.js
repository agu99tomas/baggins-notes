const mongoose = require('mongoose');

const options = {
  maxPoolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = () => mongoose.connect('mongodb://localhost/baggins-notes', options);

module.exports = { connect };
