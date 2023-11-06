const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

class AuthController {
  authenticateUser = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(409).send({ message: 'User does not exist!' });
      
      const { password } = req.body;
      const storedPass = await bcrypt.compare(password, user.password);

      if (!storedPass)
        return res.status(400).json({ message: 'invalid password' });

      // Create the JWT
      const payload = {
        user: {
          id: user,
        },
      };
      console.log(payload)
      jwt.sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 86400 },
        (error, token) => {
          if (error) throw error;
          res.json({ token, user: user._id});
        },
      );
    } catch (error) {
      console.log(
        'there was an error while trying to authenticate the user',
        error,
      );

      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  authenticatedUser = async (req, res) => {
    try {
      delete req.user.password;

      res.json({ user: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'there was an error where trying to get the authenticated user',
      });
    }
  };
}

module.exports = AuthController;
