const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

class UserController {
  createUser = async (req, res) => {
    try {
      console.log(req)
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: 'User with given email already Exist!' });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const userID = await new User({
        ...req.body,
        password: hashPassword,
      }).save();

      const payload = {
        user: {
          id: userID,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: 86400,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        },
      );
    } catch (error) {
      console.log('there was an error while trying to create the user', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
}

module.exports = UserController;
