const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const AuthentificationError = require('../errors/AuthentificationError');


module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!req.cookies.token) {
    next(new AuthorizationError('Доступа нет!'));
  } else {
  let payload;
  try {
    payload = jwt.verify(req.cookies.token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthentificationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
}
};