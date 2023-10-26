// Import necessary modules
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes'); // Import routes related to thoughts
const userRoutes = require('./userRoutes'); // Import routes related to users
const reactionRoutes = require('./reactionRoutes'); // Import routes related to reactions

// Define route middleware for different routes

// Mount thought routes under the '/thoughts' path
router.use('/thoughts', thoughtRoutes);
// This means that any routes defined in the 'thoughtRoutes' file will be prefixed with '/thoughts' when accessed through this router.

// Mount user routes under the '/users' path
router.use('/users', userRoutes);
// This means that any routes defined in the 'userRoutes' file will be prefixed with '/users' when accessed through this router.

// Mount reaction routes under the '/reactions' path
router.use('/reactions', reactionRoutes);
// This means that any routes defined in the 'reactionRoutes' file will be prefixed with '/reactions' when accessed through this router.

// Export the router so it can be used in other parts of your Express application
module.exports = router;
