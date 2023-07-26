const User = require('../models/Users');

const getAllUsers = async(req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getOneUser = async(req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({message: "User is not found"});
    } 
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $set: req.body },
      { new: true },
    );
    if (!updateUser) {
      res.status(404).json({ message: "User is not found" });
    } 
    res.json(updateUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete(
      { _id: req.params.userId }, 
    );
    if (!deleteUser) {
      res.status(404).json({ message: "User is not found" });
    } 
    res.json(deleteUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addFriends = async (req, res) => {
  try {
    const addFriend = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId }},
      { new: true }
    );
    if (!addFriend) {
      res.status(404).json({ message: "Friend is not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
};

const removeFriends = async (req, res) => {
  try {
    const removeFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.body.friendsId }}},
      { new: true }
    );
    if (!removeFriend) {
      res.status(404).json({ message: "Friend is not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports  = {
  getAllUsers, 
  getOneUser, 
  createUser, 
  updateUser, 
  deleteUser,
  addFriends,
  removeFriends
};