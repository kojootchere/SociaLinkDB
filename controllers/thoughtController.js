// controllers/thoughtController.js
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      await User.findByIdAndUpdate(
        thought.userId,
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ message: 'Thought deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body.reactionId } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: req.body.reactionId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;
