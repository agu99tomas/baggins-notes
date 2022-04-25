const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.get('', noteController.noteList);
router.post('', noteController.addNote);
router.delete('/:noteId', noteController.deleteNote);

module.exports = router;
