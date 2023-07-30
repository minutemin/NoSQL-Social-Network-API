// require express & router & thoughtController file
const express = require('express');
const router = express.Router();
const {
  getAllThoughts,
  getOneThought,
  createThoughts,
  updateThought,
  addReaction,
  removeReaction,
  deleteThought
} = require('../../controllers/thoughtController');

// route for homepage to get all thoughts and create a thought
router.route('/').get(getAllThoughts).post(createThoughts);

// route for specific user ID to get one user, update a user, and delete a user
router.route('/:thoughtsId').get(getOneThought).put(updateThought).delete(deleteThought);

// route for adding a reaction to a thought
router.route('/:thoughtsId/reactions').post(addReaction);

// route for removing a reaction from the thoughts
router.route('/:thoughtsId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
