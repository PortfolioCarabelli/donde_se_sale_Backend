const socketio = require('socket.io');
var io;

const userChatList = require('./emit/userChatList');
const updatedChat = require('./emit/updatedChat');
const specificChat = require('./emit/specificChat');

module.exports = {
  startSocketServer: function (server) {
    io = socketio(server, {
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    io.on('connection', (socket) => {
      socket.on('getUserChatList', async (data) => {
        socket.emit('userChatList', await userChatList(data));
      });

      socket.on('joinSpecificChat', async (data) => {
        socket.emit('specificChat', await specificChat(data));
      });

      socket.on('sendChatMessage', async (data) => {
        socket.emit('updatedChat', await updatedChat(data));
      });
    });
  },
};

// TODO no muestra el mensaje en el front porque tiene el useEffect cuando recarga
// pide el evento de specificChat, que no tiene el mensaje nuevo que se acaba de enviar
