// require mongoose schema & model
const { Schema, model, Types } = require('mongoose');

// Schema for reactions model
const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: { // should this be object ID reference? 
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

// export module
module.exports = reactionSchema;