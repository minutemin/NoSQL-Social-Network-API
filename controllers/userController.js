const User = require('../models/Users');

export const getAllUsers = async(req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
}