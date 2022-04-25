const auth = require('../middlewares/jwt');
const Note = require('../models/noteModel');
const validator = require('../validators/noteControllerValidator');

/**
 * Note List.
 *
 * @returns {Object}
 */
exports.noteList = [
  auth,
  async (req, res) => {
    try {
      const notes = await Note.find({ user: req.auth.id });
      return res.successWithData('Operation success', notes);
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
  validator.addNote,
  async (req, res) => {
    try {
      const note = new Note({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.auth.id,
      });

      await note.save();

      return res.successWithData('Note added successfully', note);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];

/**
 * Remove List.
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
