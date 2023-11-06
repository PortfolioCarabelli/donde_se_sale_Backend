const { Chat } = require('../../models/chat');

/*
 * {
 *   chatID: string;
 *   message: {
 *     _id: string;
 *     text: string;
 *     time: Date;
 *     user: string
 *   }
 * }
 */
async function updatedChat(data) {
  const chat = await Chat.findById(data.chatID).exec();

  chat.history.push(data.message);

  await chat.save();

  return chat;
}

module.exports = updatedChat;
