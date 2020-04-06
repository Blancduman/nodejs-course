const Task = require('./task.model');

let tasks = [];

const getAll = async boardId => {
  const boardTasks = tasks.filter(task => task.boardId === boardId);
  console.log(boardId, boardTasks.map(Task.toResponse), tasks);
  return boardTasks.map(Task.toResponse);
};

const getById = async (boardId, id) => {
  const getTask = tasks.find(
    task => task.id === id && task.boardId === boardId
  );
  if (typeof getTask === 'undefined') {
    return {
      status: 404,
      result: 'Task not found'
    };
  }
  return {
    status: 200,
    result: Task.toResponse(getTask)
  };
};

const create = async (boardId, task) => {
  // if (tasks.findIndex(t => t.title === task.title) === -1) {
  // if (task.userId !== null && task.columnId !== null) {
  tasks.push({ ...task, boardId });
  return {
    status: 200,
    result: Task.toResponse(tasks[tasks.length - 1])
  };
  // }
  // }
  // return {
  //   status: 400,
  //   result: 'Bad request.'
  // };
};

const update = async (boardId, id, updateData) => {
  const index = tasks.findIndex(t => t.id === id && t.boardId === boardId);
  if (index !== -1) {
    tasks[index] = {
      ...tasks[index],
      ...updateData
    };

    return {
      status: 200,
      result: Task.toResponse(tasks[index])
    };
  }
  return {
    status: 400,
    result: 'Bad request.'
  };
};
const remove = async (boardId, id) => {
  const index = tasks.findIndex(
    task => task.id === id && task.boardId === boardId
  );
  if (index !== -1) {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
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
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const unassigneeUserTasks = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
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
