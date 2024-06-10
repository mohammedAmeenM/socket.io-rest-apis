const jwt = require('jsonwebtoken');

// Secret key for JWT, store this securely
const JWT_SECRET = process.env.TOKEN_SCECRT;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            status: 'failure',
            message: 'No token provided'
        });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                status: 'failure',
                message: 'Failed to authenticate token'
            });
        }
        req.userId = decoded.userId;
        console.log(req.userId,'token')
        next();
    });
}

module.exports = { verifyToken };
