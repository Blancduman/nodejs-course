const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');

const userSchema = new Schema({
  name: String,
  login: String,
  password: String
});

userSchema.method('toResponse', function() {
  const { _id, name, login } = this;
  return { id: _id, name, login };
});

userSchema.method('generateAuthToken', function() {
  const token = jwt.sign({ id: this._id, login: this.login }, JWT_SECRET_KEY);
  return token;
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(14, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) return next(err1);

      user.password = hash;
      next();
    });
  });
});

userSchema.method('comparePassword', async function(candidatePassword) {
  await new Promise((resolve, reject) =>
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err);
      resolve(null, isMatch);
    })
  );
});

const User = model('User', userSchema, 'user');

exports.User = User;
