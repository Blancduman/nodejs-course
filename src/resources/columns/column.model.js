const { Schema, model } = require('mongoose');

const columnSchema = new Schema({
  title: {
    type: String
  },
  order: Number
});

columnSchema.method('toResponse', function() {
  const { _id, title, order } = this;
  return { id: _id, title, order };
});

const Column = model('Column', columnSchema, 'column');

exports.Column = Column;
