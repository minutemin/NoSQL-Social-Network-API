// require mongoose schema & model & Types 
const { Schema, model, Types } = require('mongoose');

// Schema for reactions model 
const reactionsSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionsBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

// export module
module.exports = reactionsSchema;