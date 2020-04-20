const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
  title: String,
  columns: Array
  // {
  //   // type: Schema.Types.ObjectId,
  //   type: String
  //   // ref: 'column'
  // }
});

boardSchema.method('toResponse', function() {
  const { _id, title, columns } = this;
  return { id: _id, title, columns };
});

const Board = new model('Board', boardSchema, 'board');

exports.Board = Board;
