const router = require('express').Router(); // Import the Express router
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  addFriend,
  deleteFriend
} = require('../controllers/userController'); // Import various functions from the userController.js file

// Define routes for handling user-related operations
router
  .route('/')
  .get(getAllUsers) // Handle GET requests to retrieve all users
  .post(createUser); // Handle POST requests to create a new user

router
  .route('/:id')
  .get(getUserById) // Handle GET requests to retrieve a specific user by ID
  .put(updateUser) // Handle PUT requests to update a specific user by ID
  .delete(deleteUser); // Handle DELETE requests to delete a specific user by ID

router
  .route('/:userId/friends/:friendId')
  .post(addFriend) // Handle POST requests to add a friend to a user by IDs
  .delete(deleteFriend); // Handle DELETE requests to remove a friend from a user by IDs

module.exports = router; // Export the router for use in other parts of the application
