// Importing Dependencies
const { Schema, model } = require('mongoose'); // Import the Schema and model classes from Mongoose
const mongoose = require('mongoose'); // Import the entire Mongoose library

// User Schema Definition
const UserSchema = new Schema({
  // Fields in the User Schema
  username: {
    type: String, // Define the data type as String
    unique: true, // Ensure that usernames are unique
    required: true, // The field is required
    trim: true, // Remove any leading or trailing whitespace from the input
  },
  email: {
    type: String, // Define the data type as String
    unique: true, // Ensure that email addresses are unique
    required: true, // The field is required
    match: [/.+@.+\..+/, 'Must match a valid email address'], // Validate email format
  },
  thoughts: [
    {
      type: mongoose.Types.ObjectId, // Define the data type as ObjectId
      ref: 'Thought', // Reference the 'Thought' model for this field
    }
  ],
  friends: [
    {
      type: mongoose.Types.ObjectId, // Define the data type as ObjectId
      ref: 'User', // Reference the 'User' model for this field, representing friends
    }
  ]
});

// Virtual Property to Calculate Friend Count
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Calculate the number of friends for this user
});

// Create the User Model
const User = model('User', UserSchema); // Define the "User" model based on the "UserSchema"

// Export the User Model
module.exports = User; // Export the model to use it in other parts of the application
