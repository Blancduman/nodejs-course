const { Task } = require('./task.model');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });
  const preparedTasks = tasks.map(bt => bt.toResponse());

  return preparedTasks;
};

const getById = async (boardId, id) => {
  const selectedTask = await Task.findOne({ _id: id, boardId });
  if (selectedTask) {
    return {
      status: 200,
      result: selectedTask.toResponse()
    };
  }
  return {
    status: 404,
    result: 'Task not found'
  };
};

const create = async (boardId, task) => {
  const createdTask = await new Task({ ...task, boardId }).save();
  if (createdTask) {
    return {
      status: 200,
      result: createdTask.toResponse()
    };
  }
  return {
    status: 400,
    result: 'Bad request.'
  };
};

const update = async (boardId, id, updateData) => {
  const updatedTask = await Task.findByIdAndUpdate(
    { _id: id, boardId },
    { ...updateData },
    { new: true }
  );
  if (updatedTask) {
    return {
      status: 200,
      result: updatedTask.toResponse()
    };
  }
  return {
    status: 400,
    result: 'Bad request.'
  };
};
const remove = async (boardId, id) => {
  const removingTask = await Task.findOne({ _id: id, boardId });
  if (removingTask) {
    await removingTask.remove();
    return {
      status: 204,
      result: 'The task has been deleted'
    };
  }
  return {
    status: 404,
    result: 'Task not found.'
  };
};

const removeAllBoardTasks = async boardId => {
  await Task.deleteMany({ boardId });
};

const unassigneeUserTasks = async userId => {
  await Task.updateMany({ userId }, { $set: { userId: null } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
  removeAllBoardTasks,
  unassigneeUserTasks
};
