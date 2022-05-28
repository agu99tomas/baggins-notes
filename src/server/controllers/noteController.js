const auth = require('../middlewares/jwt');
const Note = require('../models/noteModel');
const { addNote } = require('../validators/noteValidator');
const validate = require('../validators/validate');

/**
 * Note list.
 *
 * @returns {Object}
 */
exports.noteList = [
  auth,
  async (req, res) => {
    try {
      const notes = await Note.find({ user: req.auth.id });
      return res.success('Operation success', notes);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];

/**
 * Add note.
 *
 * @param {string}      title
 * @param {string}      description
 * @param {string}      category
 *
 * @returns {Object}
 */
exports.addNote = [
  auth,
  addNote,
  validate,
  async (req, res) => {
    try {
      const note = new Note({
        ...req.body,
        user: req.auth.id,
      });

      await note.save();

      return res.success('Note added successfully', note);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];

/**
 * Remove note.
 *
 * @returns {Object}
 */
exports.deleteNote = [
  auth,
  async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
      if (deletedNote === null) return res.notFound('The note does not exist');
      return res.success('Note deleted successfully');
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];
