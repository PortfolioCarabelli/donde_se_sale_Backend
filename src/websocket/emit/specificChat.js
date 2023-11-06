const { Chat } = require('../../models/chat');

async function specificChat({ chatID }) {
  const chat = await Chat.findById(chatID).exec();

  return {
    id: chat._id.toString(),
    users: chat.users,
    history: chat.history,
  };
}

module.exports = specificChat;
