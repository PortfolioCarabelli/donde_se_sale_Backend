const router = require('express').Router();
const authController = require('../controllers/auth');
const authenticateUser = require('../middleware/auth');

const AuthController = new authController();

router.post('/', AuthController.authenticateUser);

router.get('/', authenticateUser, AuthController.authenticatedUser);

module.exports = router;
