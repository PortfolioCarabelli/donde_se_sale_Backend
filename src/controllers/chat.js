const { User } = require('../models/user');
const { Chat } = require('../models/chat');

class UserClass {
  _id;
  _name;

  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  toJSON() {
    return {
      userID: this._id,
      name: this._name,
    };
  }
}

class ChatController {
  createChat = async (req, res) => {
    try {
      let chat = null;

      const actualUser = new UserClass(req.user._id, req.user.firstName);
      const guestUserName = await User.findById(req.body._id).exec();
      const guestUser = new UserClass(req.body._id, guestUserName.firstName);

      const userChats = [];
      const storedChats = await Chat.find({});

      storedChats.forEach((singleChat) => {
        singleChat.users.forEach((user) => {
          if (user.userID === actualUser._id) {
            userChats.push(singleChat);
          }
        });
      });

      userChats.forEach((singleChat) => {
        singleChat.users.forEach((user) => {
          if (user.userID === guestUser._id) {
            chat = singleChat;
          }
        });
      });

      if (chat) {
        res.status(200).json({ chatID: chat._id });
      } else {
        chat = await new Chat({
          history: [],
          users: [actualUser.toJSON(), guestUser.toJSON()],
        }).save();

        res.status(200).json({ chatID: chat._id });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'there was an error where trying to create the chat',
      });
    }
  };
}

module.exports = ChatController;
