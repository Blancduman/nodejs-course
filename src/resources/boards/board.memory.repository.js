const Board = require('./board.model');

let boards = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return boards;
};
const getById = async id => {
  const getBoard = boards.find(board => board.id === id);
  if (typeof getBoard === 'undefined') {
    return {
      status: 404,
      result: 'Board not found'
    };
  }
  return {
    status: 200,
    result: Board.toResponse(getBoard)
  };
};

const create = async board => {
  boards.push({ ...board });
  return {
    status: 200,
    result: Board.toResponse(board)
  };
};
const update = async (id, updateData) => {
  const index = boards.findIndex(b => b.id === id);
  if (index !== -1) {
    delete updateData.id;
    boards[index] = {
      ...boards[index],
      ...updateData
    };

    return {
      status: 200,
      result: Board.toResponse(boards[index])
    };
  }
  return {
    status: 400,
    result: 'Bad request.'
  };
};
const remove = async id => {
  const index = boards.findIndex(board => board.id === id);
  if (index !== -1) {
    boards = [...boards.slice(0, index), ...boards.slice(index + 1)];
    return {
      status: 204,
      result: 'The board has been deleted'
    };
  }
  return {
    status: 404,
    result: 'Board not found.'
  };
};

module.exports = { getAll, getById, create, update, delete: remove };
