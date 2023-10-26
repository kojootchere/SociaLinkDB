const router = require('express').Router(); // Import the Express router
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../controllers/thoughtController'); // Import various functions from the thoughtController.js file

// Define routes for handling thoughts
router
  .route('/')
  .get(getAllThoughts) // Handle GET requests to retrieve all thoughts
  .post(createThought); // Handle POST requests to create a new thought

router
  .route('/:id')
  .get(getThoughtById) // Handle GET requests to retrieve a specific thought by ID
  .put(updateThought) // Handle PUT requests to update a specific thought by ID
  .delete(deleteThought); // Handle DELETE requests to delete a specific thought by ID

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction) // Handle DELETE requests to delete a reaction from a thought by IDs
  .post(addReaction); // Handle POST requests to add a reaction to a thought by IDs

module.exports = router; // Export the router for use in other parts of the application
