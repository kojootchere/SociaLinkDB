// Import necessary models
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const User = require('../models/User');

// Create an object to define controller functions
const thoughtController = {
  // Controller function to get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      // Use the Thought model to find all thoughts and populate the 'reactions' field
      const thoughts = await Thought.find().populate('reactions');
      // Send the found thoughts as a JSON response
      res.json(thoughts);
    } catch (err) {
      console.log(err); // Log any errors for debugging
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },

  // Controller function to get a thought by its ID
  getThoughtById: async (req, res) => {
    try {
      // Use the Thought model to find a thought by its ID and populate the 'reactions' field
      const thought = await Thought.findById(req.params.id).populate('reactions');
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      // Send the found thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },

  // Controller function to create a new thought
  createThought: async (req, res) => {
    try {
      // Use the Thought model to create a new thought with the request body
      const thought = await Thought.create(req.body);
      // Update the User model to add the thought to the user's 'thoughts' array
      await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      // Send a 201 Created response with the created thought
      res.status(201).json(thought);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },

  // Controller function to update a thought by its ID
  updateThought: async (req, res) => {
    try {
      // Use the Thought model to find and update a thought by its ID
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      // Send the updated thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },

  // Controller function to delete a thought by its ID
  deleteThought: async (req, res) => {
    try {
      // Use the Thought model to find and delete a thought by its ID
      const thought = await Thought.findByIdAndDelete(req.params.id);
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      // Update the User model to remove the thought from the user's 'thoughts' array
      await User.findByIdAndUpdate(
        thought.userId,
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      // Send a success message as a JSON response
      res.json({ message: 'Thought deleted successfully!' });
    } catch (err) {
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },

  // Controller function to add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      console.log('here'); // Log a message for debugging
      // Use the Thought model to add a reaction to a thought
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.params.reactionId } },
        { new: true, runValidators: true }
      );
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      // Send the updated thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },

  // Controller function to delete a reaction from a thought
  deleteReaction: async (req, res) => {
    try {
      // Use the Thought model to remove a reaction from a thought
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      // Send the updated thought as a JSON response
      res.json(thought);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },
};

// Export the thoughtController object so it can be used in other parts of the application
module.exports = thoughtController;
