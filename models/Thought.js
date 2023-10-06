const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');  // Assuming Reaction is saved in the same directory

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => (new Date(timestamp)).toLocaleDateString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
