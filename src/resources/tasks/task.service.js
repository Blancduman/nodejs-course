const tasksRepo = require('./task.memory');

const getAll = boardId => tasksRepo.getAll(boardId);
const getById = (boardId, id) => tasksRepo.getById(boardId, id);
const create = (boardId, task) => tasksRepo.create(boardId, task);
const update = (boardId, id, updateData) =>
  tasksRepo.update(boardId, id, updateData);
const remove = (boardId, id) => tasksRepo.delete(boardId, id);
const removeBoardTasks = boardId => tasksRepo.removeAllBoardTasks(boardId);
const unassigneeUserTasks = userId => tasksRepo.unassigneeUserTasks(userId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
  removeBoardTasks,
  unassigneeUserTasks
};
