// Import the User model
const User = require('../models/User');

// Create an object to define controller functions
const userController = {
  // Controller function to get all users
  getAllUsers: async (req, res) => {
    try {
      // Use the User model to find all users and populate the 'thoughts' field
      const users = await User.find().populate('thoughts');
      // Send the found users as a JSON response
      res.json(users);
    } catch (err) {
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },

  // Controller function to get a user by their ID
  getUserById: async (req, res) => {
    try {
      // Use the User model to find a user by their ID and populate 'thoughts' and 'friends' fields
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      // Send the found user as a JSON response
      res.json(user);
    } catch (err) {
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },

  // Controller function to create a new user
  createUser: async (req, res) => {
    try {
      // Use the User model to create a new user with the request body
      const user = await User.create(req.body);
      // Send a 201 Created response with the created user
      res.status(201).json(user);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },

  // Controller function to update a user by their ID
  updateUser: async (req, res) => {
    try {
      // Use the User model to find and update a user by their ID
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      // Send the updated user as a JSON response
      res.json(user);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },

  // Controller function to delete a user by their ID
  deleteUser: async (req, res) => {
    try {
      // Use the User model to find and delete a user by their ID
      const user = await User.findByIdAndDelete(req.params.id);
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      // Send a success message as a JSON response
      res.json({ message: 'User deleted successfully!' });
    } catch (err) {
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json(err);
    }
  },

  // Controller function to add a friend to a user's 'friends' array
  addFriend: async (req, res) => {
    try {
      // Use the User model to add a friend to a user's 'friends' array
      const user = await User.findByIdAndUpdate(
        req.params.userId, 
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      // Send the updated user as a JSON response
      res.json(user);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  },

  // Controller function to delete a friend from a user's 'friends' array
  deleteFriend: async (req, res) => {
    try {
      // Use the User model to remove a friend from a user's 'friends' array
      const user = await User.findByIdAndUpdate(
        req.params.userId, 
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      // Send the updated user as a JSON response
      res.json(user);
    } catch (err) {
      // Send a 400 Bad Request response with the error message
      res.status(400).json(err);
    }
  }
};

// Export the userController object so it can be used in other parts of the application
module.exports = userController;
