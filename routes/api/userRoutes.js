// require express & router & userController file
const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getOneUser, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../../controllers/userController');

// Define your user-related routes here using the userController functions
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);


module.exports = router;
