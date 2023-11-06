require('dotenv').config();

const express = require('express');
const app = express();

const socket = require('./websocket/index');
const cors = require('cors');
const connection = require('./config/db');

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chat');
const eventRoutes = require('./routes/events');
const profileRoutes = require('./routes/profiles')
const establishmentRoutes = require('./routes/establishment')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/establishment', establishmentRoutes);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`[SERVER]: listening on port ${port}`);
});

socket.startSocketServer(server);
