// Importing Dependencies
const { Schema, model } = require('mongoose'); // Import the Schema and model classes from Mongoose
const mongoose = require('mongoose'); // Import the entire Mongoose library

// Reaction Schema Definition
const ReactionSchema = new Schema({
  // Fields in the Reaction Schema
  reactionId: {
    type: mongoose.Types.ObjectId, // Define the data type as ObjectId
    default: () => new mongoose.Types.ObjectId(), // Generate a new ObjectId by default
  },
  reactionBody: {
    type: String, // Define the data type as String
    required: true, // The field is required
    maxlength: 280, // Limit the maximum length of the string to 280 characters
  },
  username: {
    type: String, // Define the data type as String
    required: true, // The field is required
  },
  createdAt: {
    type: Date, // Define the data type as Date
    default: Date.now, // Set the default value to the current date and time
    get: timestamp => (new Date(timestamp)).toLocaleDateString() // Format the date for display
  }
});

// Pre-validation Middleware
ReactionSchema.pre('validate', function (next) {
  // Ensure that _id matches reactionId
  this._id = this.reactionId;
  next(); // Continue to the next middleware or validation step
});

// Create the Reaction Model
const Reaction = model('Reaction', ReactionSchema); // Define the "Reaction" model based on the "ReactionSchema"

// Export the Reaction Model
module.exports = Reaction; // Export the model to use it in other parts of the application
