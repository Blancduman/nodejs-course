const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = function(req, res, next) {
  try {
    let token = req.header('x-auth-token') || req.headers.authorization;
    if (!token.includes('Bearer ')) {
      return res.status(401).send('Invalid token.');
    }
    token = token.slice(7, token.length);
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (ex) {
    res.status(401).send('Access denied. No token provided.');
  }
};
