// require mongoose model class 
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      matches: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
    } ,
    thoughts: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Thoughts'
    }],
    friend: [{
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }], 
    }, 
    {
      toJSON:{
        virtuals: true,
      },
      id: false,
    }
  );

// Create a virtual called `friendCount` that retrieves the length of the user's `friend` array field on query.
userSchema.virtual('friendCount').get(function() {
  return this.friend.length;
})


// Using mongoose.model() to compile a model based on the schema 'userSchema'
const User = model('User', userSchema);

// export module User
module.exports = User;