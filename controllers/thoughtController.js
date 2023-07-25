const Thoughts = require('../models/Thoughts');


export const getAllThoughts = async(req, res) => {
  try {
    const allThoughts = await Thoughts.find()
    res.json(allThoughts);
  } catch (err) {
    console.log(err);
  }
}

export const getOneThought = async(req, res) => {
  try {
    const thought = await Thoughts.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      res.status(404).json("That thought is not found");
    } 
    res.json(thought);
  } catch (err) {
    console.log(err);
  }
}

export const createThought = async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    res.json(newThought);
  } catch (err) {
    console.log(err);
  }
}

export const updateThought = async (req, res) => {
  try {
    const updateThought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $set: req.body },
      { new: true },
    );
    if (!updateThought) {
      res.status(404).json("Thought is not found");
    } 
    res.json(updateThought);
  } catch (err) {
    console.log(err);
  }
}

export const deleteThought = async (req, res) => {
  try {
    const deleteThought = await Thoughts.findOneAndDelete(
      { _id: req.params.thoughtId }, 
    );
    if (!deleteThought) {
      res.status(404).json("Thought is not found");
    } 
    res.json(deleteThought);
  } catch (err) {
    console.log(err);
  }
}

