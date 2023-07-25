const User = require('../models/Users');

export const getAllUsers = async(req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
}

export const getOneUser = async(req, res) => {
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

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
}