const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const Task = require('../tasks/task.model');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  return res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const newBoard = new Board(req.body);
  const createdBoard = await boardsService.create(newBoard);
  return res.status(createdBoard.status).json(createdBoard.result);
});

router.route('/:id').get(async (req, res) => {
  const getBoard = await boardsService.getById(req.params.id);

  return res.status(getBoard.status).json(getBoard.result);
});

router.route('/:id').put(async (req, res) => {
  const updatedBoard = await boardsService.update(req.params.id, req.body);

  return res.status(updatedBoard.status).json(updatedBoard.result);
});

router.route('/:id').delete(async (req, res) => {
  const removedBoard = await boardsService.delete(req.params.id);
  if (removedBoard.status === 204) {
    await tasksService.removeBoardTasks(req.params.id);
  }
  return res.status(removedBoard.status).json(removedBoard.result);
});

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);

  return res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const newTask = new Task(req.body);
  const createdTask = await tasksService.create(newTask);
  return res.status(createdTask.status).json(createdTask.result);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const getTask = await tasksService.getById(
    req.params.taskId,
    req.params.boardId
  );
  return res.status(getTask.status).json(getTask.result);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const updatedTask = await tasksService.update(
    req.params.taskId,
    req.params.boardId,
    req.body
  );
  return res.status(updatedTask.status).json(updatedTask.result);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const removedTask = await tasksService.update(
    req.params.taskId,
    req.params.boardId
  );
  return res.status(removedTask.status).json(removedTask.result);
});

module.exports = router;
