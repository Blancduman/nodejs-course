const { Board } = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({});
  const preparedBoards = boards.map(b => b.toResponse());

  return preparedBoards;
};
const getById = async id => {
  const selectedBoard = await Board.findById(id);
  if (selectedBoard) {
    return {
      status: 200,
      result: selectedBoard.toResponse()
    };
  }
  return {
    status: 404,
    result: 'Board not found'
  };
};

const create = async board => {
  const createdBoard = await new Board({ ...board }).save();
  if (createdBoard) {
    return {
      status: 200,
      result: createdBoard.toResponse()
    };
  }

  return {
    status: 400,
    result: 'Bad request.'
  };
};

const update = async (id, updateData) => {
  const updatedBoard = await Board.findByIdAndUpdate(
    { _id: id },
    { ...updateData },
    { new: true }
  );
  if (updatedBoard) {
    return {
      status: 200,
      result: updatedBoard.toResponse()
    };
  }
  return {
    status: 400,
    result: 'Bad request.'
  };
};
const remove = async id => {
  const removingBoard = await Board.findOne({ _id: id });
  if (removingBoard) {
    await removingBoard.remove();
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
