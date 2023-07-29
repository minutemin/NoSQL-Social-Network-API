// require mongoose model class 
const { Schema, model, Types } = require('mongoose');
const reactionsSchema = require('./Reactions');

// Schema to create Thoughts model
const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    username: { 
      type: String,
      required: true,
    },
    reactions: [reactionsSchema]
    },
    {
      toJSON:{
        virtuals: true,
      },
      id: false,
    }
  
  );

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})


// Using mongoose.model() to compile a model based on the schema 'thoughtsSchema'
const Thoughts = model('Thoughts', thoughtSchema);

// export module Thoughts
module.exports = Thoughts;