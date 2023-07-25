const User = require('../models/Users');

export const getAllUsers = async(req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

export const getOneUser = async(req, res) => {
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
}

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

export const updateUser = async (req, res) => {
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
}

export const deleteUser = async (req, res) => {
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
}

export const addFriend = async (req, res) => {
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId }},
      { new: true }
    );
    if (!addFriend) {
      res.status(404).json({ message: "Friend is not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
}

export const removeFriend = async (req, res) => {
  try {
    const removeFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.body.friendId }}},
      { new: true }
    );
    if (!removeFriend) {
      res.status(404).json({ message: "Friend is not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}