const Note = require('../models/Note');

// @desc    Get logged-in user's notes with Search, Filtering, and Pagination
// @route   GET /api/notes?search=xyz&category=Work&page=1&limit=6
exports.getNotes = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 6 } = req.query;

    // 1. User-level isolation
    const query = { user: req.user._id };

    // 2. Search by title or content (Case-insensitive regex)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // 3. Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // 4. Pagination calculation
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 6;
    const skip = (pageNum - 1) * limitNum;

    const totalNotes = await Note.countDocuments(query);
    const notes = await Note.find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      notes,
      page: pageNum,
      totalPages: Math.ceil(totalNotes / limitNum) || 1,
      totalNotes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new note
// @route   POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const { title, content, category, isPinned } = req.body;
    if (!title || !content) {
      res.status(400);
      throw new Error('Title and content are required');
    }

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      category: category || 'General',
      isPinned: Boolean(isPinned)
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a note (with ownership check)
// @route   PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    // User-level authorization check
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('User not authorized to update this note');
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note (with ownership check)
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    // User-level authorization check
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('User not authorized to delete this note');
    }

    await note.deleteOne();
    res.json({ message: 'Note removed successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};