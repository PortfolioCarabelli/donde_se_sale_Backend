const router = require('express').Router();
const chatController = require('../controllers/chat');
const authenticateUser = require('../middleware/auth');

const ChatController = new chatController();

router.post('/', authenticateUser, ChatController.createChat);

module.exports = router;
