const mongoose = require('mongoose');
const Joi = require('joi');

const chatSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
  },
  history: {
    type: Array,
    required: true,
  },
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = { Chat };
