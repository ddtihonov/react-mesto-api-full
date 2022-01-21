const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const EmailError = require('../errors/EmailError');
const AuthentificationError = require('../errors/AuthentificationError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })
        .status(200)
        .send({ token });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId ? req.params.userId : req.user._id)
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким _id');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Нет пользователя с таким _id') {
        next(new NotFoundError('Нет пользователя с таким _id'));
      } else if (err.name === 'CastError') {
        next(new IncorrectDataError('Некоректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password || password.length < 8) {
    throw new AuthentificationError('Неправильные почта или пароль');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(200).send({
      user: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Введены некорректиные данные'));
      }
      if (err.code === 11000) {
        next(new EmailError('Пользователь с таким email уже зарегестрирован'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким _id');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Нет пользователя с таким _id') {
        next(new NotFoundError('Нет пользователя с таким _id'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Введены некорректиные данные'));
      } else if (err.name === 'CastError') {
        next(new IncorrectDataError('Некоректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким _id');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Нет пользователя с таким _id') {
        next(new NotFoundError('Нет пользователя с таким _id'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Введены некорректиные данные'));
      } else if (err.name === 'CastError') {
        next(new IncorrectDataError('Некоректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
  login,
};
