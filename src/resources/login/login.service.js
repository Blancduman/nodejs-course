const usersRepo = require('../users/user.db');

const postUser = user => usersRepo.postLogin(user);

module.exports = { postUser };
