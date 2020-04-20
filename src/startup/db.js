const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { winston } = require('./logging');

module.exports = () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      winston.info('Connected to db...');
    });
};
