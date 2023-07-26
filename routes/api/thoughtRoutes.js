// require express & router & thoughtController file
const express = require('express');
const router = express.Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// route for homepage to get all thoughts and create a thought
// router.route('/').get
module.exports = router;
