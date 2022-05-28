const mongoose = require('mongoose');

const dbConnect = () => {
  const options = {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect('mongodb://localhost/baggins-notes', options);
};

module.exports = dbConnect;
