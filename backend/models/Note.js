const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Ensures user-specific note isolation
  },
  title: { type: String, required: [true, 'Title is required'], trim: true },
  content: { type: String, required: [true, 'Content is required'] },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Study', 'Ideas', 'General'],
    default: 'General'
  },
  isPinned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);