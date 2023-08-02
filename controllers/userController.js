// require Users Model from the model's folder
const Users = require('../models/Users');
// function expression to get all users from Mongo DB
const getAllUsers = async(req, res) => {
  try {
    const allUsers = await Users.find()
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// function expression to get one user by user Id.
const getOneUser = async(req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({message: "User is not found"});
    } 
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// function expression to create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(200).json({ message: "User has been created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// function expression to update a field for a user
const updateUser = async (req, res) => {
  try {
    const updateUser = await Users.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $set: req.body },
      { new: true },
    );
    if (!updateUser) {
      res.status(404).json({ message: "User is not found" });
    } 
    res.status(200).json({ message: "User information has been updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
};
// function to delete a user
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await Users.findOneAndDelete(
      { _id: req.params.userId }, 
    );
    if (!deleteUser) {
      res.status(404).json({ message: "User is not found" });
    } 
    res.status(200).json({ message: "User has been deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// function to add a freind to the friend's array of a user
const addFriends = async (req, res) => {
  try {
    const addFriend = await Users.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId }},
      { new: true }
    );
    if (!addFriend) {
      res.status(404).json({ message: "Friend is not found" });
    } else {
      res.status(200).json({ message: "Adding friend!"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
};
// function to remove friends from friend's array of a user
const removeFriends = async (req, res) => {
  try {
    const removeFriend = await Users.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: req.params.friendsId }},
      { new: true }
    );
    if (!removeFriend) {
      res.status(404).json({ message: "Friend is not found" });
    } else {
      res.status(200).json({ message: "Removing friend!"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// export the function modules
module.exports  = {
  getAllUsers, 
  getOneUser, 
  createUser, 
  updateUser, 
  deleteUser,
  addFriends,
  removeFriends
};