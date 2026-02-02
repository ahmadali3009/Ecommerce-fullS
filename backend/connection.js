const mongoose = require('mongoose');

async function connect(url) {
  const mongoUrl =
    url ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/FullEcommerce';
  return mongoose.connect(mongoUrl);
}

module.exports = connect;
