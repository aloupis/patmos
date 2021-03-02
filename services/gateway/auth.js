const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const authenticate = (token) => {
  if (!token) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in'
    );
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    return id;
  } catch (err) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in'
    );
  }
};

module.exports = { authenticate };
