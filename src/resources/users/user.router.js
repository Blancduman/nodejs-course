const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  return res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const newUser = new User(req.body);
  const createdUser = await usersService.create(newUser);

  return res.status(createdUser.status).json(createdUser.result);
});

router.route('/:id').get(async (req, res) => {
  const getUser = await usersService.getById(req.params.id);

  return res.status(getUser.status).json(getUser.result);
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.update(req.params.id, req.body);

  return res.status(updatedUser.status).json(updatedUser.result);
});

router.route('/:id').delete(async (req, res) => {
  const removedUser = await usersService.delete(req.params.id);
  if (removedUser.status === 204) {
    await tasksService.unassigneeUserTasks(req.params.id);
  }
  return res.status(removedUser.status).json(removedUser.result);
});

module.exports = router;
