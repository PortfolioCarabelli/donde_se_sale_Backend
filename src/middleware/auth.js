const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'missing token' });

  try {
    const encode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    /**
     * firstName: string;
     * lastName: string;
     * email: string;
     * password: string;
     * _id: string;
     * __v: number;
     */
    req.user = encode.user.id;

    next();
  } catch (error) {
    console.log(
      'there was an error while trying to authenticate the user',
      error,
    );

    res.status(401).json({ msg: 'invalid token' });
  }
}

module.exports = authenticateUser;
