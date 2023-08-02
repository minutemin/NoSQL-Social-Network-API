// require express & router & the functions in the userController file
const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getOneUser, 
  createUser, 
  updateUser, 
  deleteUser,
  addFriends,
  removeFriends
} = require('../../controllers/userController');

// route for homepage to get all users and create a user
router.route('/').get(getAllUsers).post(createUser);

// route for specific user ID to get one user, update a user, and delete a user
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// route for adding a friend to the friend list
router.route('/:userId/friends/:friendsId').post(addFriends);

// route for removing a friend from the friend list
router.route('/:userId/friends/:friendsId').delete(removeFriends);

// export the router module
module.exports = router;
