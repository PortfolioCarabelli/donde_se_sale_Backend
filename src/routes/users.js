const router = require('express').Router();
const userController = require('../controllers/user');

const UserController = new userController();

router.post('/', UserController.createUser);

module.exports = router;
