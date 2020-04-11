const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { winston, morgan } = require('./startup/logging');

process.on('uncaughtException', error => {
  winston.error(`error: ${error.message}`);
});

process.on('unhandledRejection', rejection => {
  throw rejection;
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(morgan('dev'));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/users') {
    return next(new Error(require('http-status-codes').INTERNAL_SERVER_ERROR));
  }
  if (req.originalUrl === '/') {
    res.send('Service is running!');

    return;
  }
  const { method, url, params, body } = req;
  winston.info({ method, url, params, body });
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    const {
      INTERNAL_SERVER_ERROR,
      getStatusText
    } = require('http-status-codes');
    const { method, url, params, body } = req;
    winston.error({ method, url, params, body });
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

module.exports = app;
