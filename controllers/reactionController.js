// Import the Reaction model
const Reaction = require('../models/Reaction');

// Create an object to define controller functions
const reactionController = {
  // Controller function to get all reactions
  getAllReactions: async (req, res) => {
    try {
      console.log('here'); // Log a message for debugging
      // Use the Reaction model to find all reactions in the database
      const reactions = await Reaction.find();
      // Send the found reactions as a JSON response
      res.json(reactions);
    } catch (err) {
      console.log(err); // Log any errors for debugging
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },
};

// Export the reactionController object so it can be used in other parts of the application
module.exports = reactionController;
