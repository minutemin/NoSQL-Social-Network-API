// require the Thoughts and Users Model
const Thoughts = require('../models/Thoughts');
const Users = require('../models/Users');

// function expression to get all thougths
const getAllThoughts = async (req, res) => {
  try {
    const allThoughts = await Thoughts.find()
    res.json(allThoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// function expression to get one thought
const getOneThought = async (req, res) => {
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
// function expression to create a thought
const createThoughts = async (req, res) => {
  try {
    // creating the thought
    const createdThought = await Thoughts.create(req.body);
    // finding the user and update the thoughts in the thoughts array
    const userToThought = await Users.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: createdThought._id } },
      { new: true }
    );
    if (!userToThought) {
      res.status(404).json({ message: "Username is not found" });
    } else {
      res.status(200).json({ message: "Thought has been created!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// function expression for updating thoughts
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
    res.status(200).json({ message: "Thought has been updated!" });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// function expression to delete thoughts by ID
const deleteThought = async (req, res) => {
  try { // deletes the thought
    const removeThought = await Thoughts.findOneAndDelete(
      { _id: req.params.thoughtsId },
    );
    if (!removeThought) {
      res.status(404).json({ message: "Thought is not found" });
    } //find the thought in User array and removes it from the array by ID
    const updatedUser = await Users.findOneAndUpdate(
      { thoughts: req.params.thoughtsId },
      { $pull: { thoughts: req.params.thoughtsId } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User is not found" });
    }
    res.status(200).json({ message: "Thought deleted!"});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// function expression for adding a reaction to a thought 
const addReaction = async (req, res) => {
  try {

    const addReaction = await Thoughts.findByIdAndUpdate(
      { _id: req.params.thoughtsId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!addReaction) {
      res.status(404).json({ message: "Reaction is not found" });
    } else {
      res.status(200).json({ message: "Reaction Added to thought! " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
}
// function expression for removing a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const removeReaction = await Thoughts.findByIdAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
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
// export all the expression modules. 
module.exports = {
  getAllThoughts,
  getOneThought,
  createThoughts,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
};
