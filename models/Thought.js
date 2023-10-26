// Importing Dependencies
const { Schema, model } = require('mongoose'); // Import the Schema and model classes from Mongoose
const mongoose = require('mongoose'); // Import the entire Mongoose library

// Thought Schema Definition
const ThoughtSchema = new Schema({
  // Fields in the Thought Schema
  thoughtText: {
    type: String, // Define the data type as String
    required: true, // The field is required
    maxlength: 280, // Limit the maximum length of the string to 280 characters
  },
  createdAt: {
    type: Date, // Define the data type as Date
    default: Date.now, // Set the default value to the current date and time
    get: timestamp => (new Date(timestamp)).toLocaleDateString(), // Format the date for display
  },
  username: {
    type: String, // Define the data type as String
    required: true, // The field is required
  },
  reactions: [
    {
      type: mongoose.Types.ObjectId, // Define the data type as ObjectId
      ref: 'Reaction', // Reference the 'Reaction' model for this field
      match: { 'reactionId': '$reaction' }, // Match the 'reactionId' in 'Reaction' model
    }
  ]
});

// Virtual Property to Calculate Reaction Count
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Calculate the number of reactions for this thought
});

// Create the Thought Model
const Thought = model('Thought', ThoughtSchema); // Define the "Thought" model based on the "ThoughtSchema"

// Export the Thought Model
module.exports = Thought; // Export the model to use it in other parts of the application
