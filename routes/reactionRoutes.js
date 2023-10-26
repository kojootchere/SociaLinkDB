const router = require('express').Router(); // Import the Express router
const { getAllReactions } = require('../controllers/reactionController'); // Import the getAllReactions function from the reactionController.js file

router
  .route('/') // Define a route for the root path
  .get(getAllReactions); // Handle GET requests to the root path by calling the getAllReactions function

module.exports = router; // Export the router for use in other parts of the application
