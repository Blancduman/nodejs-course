const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  login: String,
  password: String
});

userSchema.method('toResponse', function() {
  const { _id, name, login } = this;
  return { id: _id, name, login };
});

const User = model('User', userSchema, 'user');

exports.User = User;
