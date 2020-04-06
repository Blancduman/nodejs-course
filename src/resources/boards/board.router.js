const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

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

  return res.status(removedBoard.status).json(removedBoard.result);
});

module.exports = router;
