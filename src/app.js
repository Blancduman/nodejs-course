const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { winston, morgan } = require('./startup/logging');
const error = require('./middleware/error');

process.on('uncaughtException', err => {
  winston.error(err);
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
  if (req.originalUrl === '/') {
    res.send('Service is running!');

    return;
  }
  const { method, url, params, body } = req;
  winston.info({ method, url, params, body });
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(error);

module.exports = app;
