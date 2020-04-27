const { User } = require('../users/user.model');

const getAll = async () => {
  const users = await User.find({});
  const responseUsers = users.map(u => u.toResponse());
  return responseUsers;
};

const getById = async id => {
  const getUser = await User.findById(id);

  if (getUser) {
    return {
      status: 200,
      result: getUser.toResponse()
    };
  }

  return {
    status: 404,
    result: 'User not found'
  };
};

const create = async user => {
  const createdUser = await new User({ ...user }).save();

  if (createdUser) {
    return {
      status: 200,
      result: createdUser.toResponse()
    };
  }

  return {
    status: 400,
    result: 'Bad request.'
  };
};

const update = async (id, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    { ...updateData },
    { new: true }
  );

  if (updatedUser) {
    return {
      status: 200,
      result: updatedUser.toResponse()
    };
  }

  return {
    status: 400,
    result: 'Bad request.'
  };
};

const remove = async id => {
  const removingdUser = await User.findById({ _id: id });

  if (removingdUser) {
    await removingdUser.remove();

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

const postLogin = async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user || !user.comparePassword(password)) {
    return {
      status: 400,
      result: 'Invalid login or password.'
    };
  }
  const token = user.generateAuthToken();
  return {
    status: 200,
    result: { token }
  };
};

module.exports = { getAll, getById, create, update, delete: remove, postLogin };
