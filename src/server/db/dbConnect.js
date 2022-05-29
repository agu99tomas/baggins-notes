const mongoose = require('mongoose');

const dbConnect = () => {
  const options = {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(process.env.MONGODB_URL, options);
};

module.exports = dbConnect;
