const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String
  },
  order: Number,
  description: {
    type: String
  },
  userId: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'user'
  },
  boardId: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'board'
  },
  columnId: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'column'
  }
});

taskSchema.method('toResponse', function() {
  const { _id, title, order, description, userId, boardId, columnId } = this;
  return { id: _id, title, order, description, userId, boardId, columnId };
});

const Task = model('Task', taskSchema, 'task');

exports.Task = Task;
