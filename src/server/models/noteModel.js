const mongoose = require('mongoose');

const { Schema } = mongoose;

const options = { timestamps: true };

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  options,
);

module.exports = mongoose.model('Note', NoteSchema);
