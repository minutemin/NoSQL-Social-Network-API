const Thoughts = require('../models/Thoughts');


const getAllThoughts = async(req, res) => {
  try {
    const allThoughts = await Thoughts.find()
    res.json(allThoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const getOneThought = async(req, res) => {
  try {
    const thought = await Thoughts.findOne({ _id: req.params.thoughtsId });
    if (!thought) {
      res.status(404).json({ message: "That thought is not found" });
    } 
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const createThought = async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    res.json(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const updateThought = async (req, res) => {
  try {
    const updateThought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId }, 
      { $set: req.body },
      { new: true },
    );
    if (!updateThought) {
      res.status(404).json({ message: "Thought is not found" });
    } 
    res.json(updateThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const deleteThought = async (req, res) => {
  try {
    const deleteThought = await Thoughts.findOneAndDelete(
      { _id: req.params.thoughtsId }, 
    );
    if (!deleteThought) {
      res.status(404).json({ message: "Thought is not found" });
    } 
    res.json(deleteThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


const addReaction = async (req, res) => {
  try {
    const addReaction = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.params.reactionId }},
      { new: true }
    );
    if (!addReaction) {
      res.status(404).json({ message: "Reaction is not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
}

const removeReaction = async (req, res) => {
  try {
    const removeReaction = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionId: req.body.reactionId }}},
      { new: true }
    );
    if (!removeReaction) {
      res.status(404).json({ message: "Reaction is not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
};
