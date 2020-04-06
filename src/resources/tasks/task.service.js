const tasksRepo = require('./task.memory');

const getAll = boardId => tasksRepo.getAll(boardId);
const getById = (id, boardId) => tasksRepo.getById(id, boardId);
const create = task => tasksRepo.create(task);
const update = (id, boardId, updateData) =>
  tasksRepo.update(id, boardId, updateData);
const remove = (id, boardId) => tasksRepo.delete(id, boardId);
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
