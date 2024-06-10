const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.TOKEN_SCECRT;

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };