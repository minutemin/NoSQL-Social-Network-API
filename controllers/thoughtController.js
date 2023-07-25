const Thoughts = require('../models/Thoughts');

/*
export const getAllThoughts = async(req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
}

export const getOneThought = async(req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).json("User is not found");
    } 
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

export const createThought = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
}

export const updateThought = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $set: req.body },
      { new: true },
    );
    if (!updateUser) {
      res.status(404).json("User is not found");
    } 
    res.json(updateUser);
  } catch (err) {
    console.log(err);
  }
}

export const deleteThought = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete(
      { _id: req.params.userId }, 
    );
    if (!deleteUser) {
      res.status(404).json("User is not found");
    } 
    res.json(deleteUser);
  } catch (err) {
    console.log(err);
  }
}

*/