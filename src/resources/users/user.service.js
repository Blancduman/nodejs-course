const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = user => usersRepo.create(user);
const update = (id, updateData) => usersRepo.update(id, updateData);
const remove = id => usersRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: remove };
