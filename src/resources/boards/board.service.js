const boardsRepo = require('./board.db');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = user => boardsRepo.create(user);
const update = (id, updateData) => boardsRepo.update(id, updateData);
const remove = id => boardsRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: remove };
