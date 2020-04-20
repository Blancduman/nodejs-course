const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const createdBoard = await boardsService.create(req.body);
  res.status(createdBoard.status).json(createdBoard.result);
});

router.route('/:boardId').get(async (req, res) => {
  const getBoard = await boardsService.getById(req.params.boardId);

  res.status(getBoard.status).json(getBoard.result);
});

router.route('/:boardId').put(async (req, res) => {
  const updatedBoard = await boardsService.update(req.params.boardId, req.body);

  res.status(updatedBoard.status).json(updatedBoard.result);
});

router.route('/:boardId').delete(async (req, res) => {
  await tasksService.removeBoardTasks(req.params.boardId);
  const removedBoard = await boardsService.delete(req.params.boardId);
  res.status(removedBoard.status).json(removedBoard.result);
});

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(200).json(tasks);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const createdTask = await tasksService.create(req.params.boardId, req.body);
  res.status(createdTask.status).json(createdTask.result);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const getTask = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );
  res.status(getTask.status).json(getTask.result);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const updatedTask = await tasksService.update(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.status(updatedTask.status).json(updatedTask.result);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const removedTask = await tasksService.delete(
    req.params.boardId,
    req.params.taskId
  );
  res.status(removedTask.status).json(removedTask.result);
});

module.exports = router;
