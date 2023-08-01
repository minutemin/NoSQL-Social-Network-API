const Thoughts = require('../models/Thoughts');
const User = require('../models/Users');


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

const createThoughts = async (req, res) => {
  try {
    // create the thought
    const createdThought = await Thoughts.create(req.body);
   // find the user and update the thoughts array
    const userToThought = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: createdThought._id }},
      { new: true }
    );
    if (!userToThought) {
      res.status(404).json({ message: "Username is not found"});
    } else { 
      res.status(200).json({ message: "Created the thought!", createdThought });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


const updateThought = async (req, res) => {
  try {
    const addThought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId }, 
      { $set: req.body },
      { new: true },
    );
    if (!addThought) {
      res.status(404).json({ message: "Thought is not found" });
    } 
    res.json(addThought);
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const deleteThought = async (req, res) => {
  try {
    const removeThought = await Thoughts.findOneAndRemove(
      { _id: req.params.thoughtsId }, 
    );
    if (!removeThought) {
      res.status(404).json({ message: "Thought is not found" });
    } 
    const updatedUser = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtsId },
      { $pull: { thoughts: req.params.thoughtId }},
      { new: true }
    );
    res.json(removeThought);
 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


const addReaction = async (req, res) => {
  try {

    const addReaction = await Thoughts.findByIdAndUpdate(
      { _id: req.params.thoughtsId },
      { $push: { reactions: req.body }},
      { new: true, runValidators: true }
    );
    if (!addReaction) {
      res.status(404).json({ message: "Reaction is not found" });
    } else {
      res.status(200).json({ message: "Reaction Added to !! "});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
}

const removeReaction = async (req, res) => {
  try {
    const removeReaction = await Thoughts.findByIdAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionId: req.params.reactionId }}},
      { new: true }
    );
    if (!removeReaction) {
      res.status(404).json({ message: "Reaction is not found" });
    } else {
      res.status(200).json({ message: "Reaction Removed!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
  getOneThought,
  createThoughts,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
};
