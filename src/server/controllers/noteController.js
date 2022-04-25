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
      const query = { user: req.auth.id };
      const populate = { path: 'user', select: 'firstName lastName' };
      const notes = await Note.find(query).populate(populate);
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

      const noteData = {
        id: note._id,
        title: note.title,
        description: note.description,
        category: note.category,
      };

      return res.successWithData('Operation success', noteData);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
];
