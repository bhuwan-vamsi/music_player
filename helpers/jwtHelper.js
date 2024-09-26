const jwt = require('jsonwebtoken');

exports.generateToken = (email) => {
  return jwt.sign({ email }, 'jwt-security-key', { expiresIn: '1h' });
};
