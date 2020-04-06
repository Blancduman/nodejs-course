const User = require('../users/user.model');

let users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};
const getById = async id => {
  const getUser = users.find(user => user.id === id);
  console.log(getUser);
  if (typeof getUser === 'undefined') {
    return {
      code: 404,
      result: 'User not found'
    };
  }
  return {
    code: 200,
    result: {
      ...User.toResponse(getUser)
    }
  };
};
const create = async user => {
  if (users.findIndex(u => u.login === user.login) === -1) {
    users.push({ ...user });
    console.log(users);
    return {
      code: 200,
      result: 'The user has been created.'
    };
  }
  return {
    code: 400,
    result: 'Bad request.'
  };
};
const update = async (id, updateData) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updateData
    };

    return {
      code: 200,
      result: 'The user has been updated.'
    };
  }
  return {
    code: 400,
    result: 'Bad request.'
  };
};
const remove = async id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users = [...users.slice(0, index), ...users.slice(index + 1)];
    return {
      code: 204,
      result: '	The user has been deleted'
    };
  }
  return {
    code: 404,
    result: 'User not found.'
  };
};

module.exports = { getAll, getById, create, update, delete: remove };
