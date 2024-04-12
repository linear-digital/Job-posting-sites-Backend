const jwt = require('jsonwebtoken')

const authChecker = async (req, res, next) => {

    const secret = process.env.JWT_SECRET

    const token = req?.headers?.token
    if (!token) {
        return res.status(404).json({ message: 'No token Found' });
    }
    const decoded = jwt.verify(token, secret)
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded
    next();
}

module.exports = authChecker