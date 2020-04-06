const User = require('../users/user.model');

let users = [];

const getAll = async () => {
  return users;
};

const getById = async id => {
  const getUser = users.find(user => user.id === id);

  if (typeof getUser === 'undefined') {
    return {
      status: 404,
      result: 'User not found'
    };
  }
  return {
    status: 200,
    result: User.toResponse(getUser)
  };
};

const create = async user => {
  if (users.findIndex(u => u.login === user.login) === -1) {
    users.push({ ...user });
    console.log(users);
    return {
      status: 200,
      result: User.toResponse(user)
    };
  }
  return {
    status: 400,
    result: 'Bad request'
  };
};

const update = async (id, updateData) => {
  const index = users.findIndex(u => u.id === id);
  delete updateData.id;
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updateData
    };

    return {
      status: 200,
      result: User.toResponse(users[index])
    };
  }
  return {
    status: 400,
    result: 'Bad request.'
  };
};

const remove = async id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users = [...users.slice(0, index), ...users.slice(index + 1)];
    return {
      status: 204,
      result: 'The user has been deleted'
    };
  }
  return {
    status: 404,
    result: 'User not found.'
  };
};

module.exports = { getAll, getById, create, update, delete: remove };
