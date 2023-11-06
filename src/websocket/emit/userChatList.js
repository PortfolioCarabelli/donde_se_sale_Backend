const { Chat } = require('../../models/chat');

async function userChatList({ userID }) {
  const storedChats = await Chat.find({});
  const userChats = [];

  storedChats.forEach((singleChat) => {
    singleChat.users.forEach((user) => {
      if (user.userID === userID) {
        userChats.push(singleChat);
      }
    });
  });

  const formattedChats = userChats.map((chat) => ({
    imageURL: 'logo192.png',
    username: chat.users.filter((user) => user.userID !== userID)[0].name,
    msgPreview:
      chat.history.length > 1 ? chat.history[chat.history.length - 1].text : '',
    chatID: chat._id.toString(),
  }));

  return JSON.stringify(formattedChats);
}

module.exports = userChatList;
