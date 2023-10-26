// Load environment variables from a .env file if available
require('dotenv').config();

// Import data from various data files
const thoughtData = require('./thoughtData');
const userData = require('./userData');
const reactionData = require('./reactionData');

// Import required modules and models
const connectDB = require('../config/connection');
const Thought = require('../models/Thought');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

// Connect to the database
connectDB();

// Function to get a user by username
const getUserByUsername = async (username) => {
  return await User.findOne({ username }).then((user) => { return { id: user._id.toString(), username: user.username } });
};

// Function to get thoughts by a user
const getThoughtsByUser = async (username) => {
  return await Thought.find({ username }).then((thoughts) => thoughts.map((thought) => thought._id.toString()));
};

// Function to add thoughts to a user
const addThoughts = async (userId, thoughts) => {
  // Update user's thoughts
  await User.findByIdAndUpdate(
    userId, // The user's _id
    { $push: { thoughts } },
    { new: true }
  );
};

// Function to add a friend to a user
const addFriend = async (userId, friendId) => {
  await User.findByIdAndUpdate(
    userId,
    { $push: { friends: friendId } },
    { new: true }
  );
};

// Function to update a thought by thought text and add a reaction
async function updateThoughtByThoughtText(thoughtText, reaction) {
  try {
    // Use findOneAndUpdate to find and update the thought
    const updatedThought = await Thought.findOneAndUpdate(
      { thoughtText },
      { $push: { reactions: reaction } },
      {
        new: true, // Return the updated thought
      }
    );

    if (updatedThought) {
      console.log('Thought updated:', updatedThought);
    } else {
      console.log('Thought not found.');
    }
  } catch (err) {
    console.error('Error updating thought by thoughtText:', err);
    return null; // Handle the error as needed
  }
}

// Function to link reactions to thoughts
async function linkReactionsToThoughts() {
  try {
    // Retrieve the reactions you want to link
    const reactions = await Reaction.find({});

    // Loop through the thoughts and add reactions to their reactions array
    for (const reaction of reactions) {
      if (reaction.reactionBody === 'This is a reaction to thought 1 of user 1' ||
        reaction.reactionBody === "Response to reaction thought 1 ") {
        await updateThoughtByThoughtText("This is thought 1 by user 1", reaction.reactionId.toString())
      }
      if (reaction.reactionBody === "Reaction to thought 2") {
        await updateThoughtByThoughtText("This is thought 2 by user 1", reaction.reactionId.toString())
      }
    }

    console.log('Reactions linked to thoughts successfully');
  } catch (err) {
    console.error('Error linking reactions to thoughts:', err);
  }
}

// Function to import data into the database
const importData = async () => {
  try {
    // Delete existing data in the database
    await Thought.deleteMany({});
    await User.deleteMany({});
    await Reaction.deleteMany({});

    // Insert new data into the database
    await Thought.insertMany(thoughtData);
    await User.insertMany(userData);
    await Reaction.insertMany(reactionData);

    // Get all the ids of the newly added data
    const user1 = await getUserByUsername(userData[0].username);
    const user2 = await getUserByUsername(userData[1].username);

    // Link friends, thoughts, and reactions
    await addFriend(user2.id, user1.id);
    await addThoughts(user1.id, await getThoughtsByUser(user1.username));
    await addThoughts(user2.id, await getThoughtsByUser(user2.username));
    await linkReactionsToThoughts();

    console.log('Data Import Success');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

// Call the importData function to start the data import process
importData();
