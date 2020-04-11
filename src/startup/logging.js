const winston = require('winston');
const morgan = require('morgan');

require('express-async-errors');

const options = {
  fileInfo: {
    level: 'info',
    filename: 'logs/info.log',
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    handleExceptions: false
  },
  fileError: {
    level: 'error',
    filename: 'logs/error.log',
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    handleExceptions: true
  }
};
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError)
  ],
  exitOnError: false
});
module.exports = {
  winston: logger,
  morgan
};
