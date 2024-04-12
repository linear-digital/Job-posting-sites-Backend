const jwt = require('jsonwebtoken');
const User = require('../modules/user/userModel');

const recruiterChecker = async (req, res, next) => {

    const secret = process.env.JWT_SECRET

    const token = req?.headers?.token
    if (!token) {
        return res.status(404).json({ message: 'No token Found' });
    }
    const decoded = jwt.verify(token, secret)
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    else {
        const user = await User.findOne({email: decoded.email})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else if (user.role !== 'recruiter') {
            return res.status(401).json({ message: 'You cant create a job post This feature is only for Recruiters' });
        }
        req.user = decoded
    }

    next();
}

module.exports = recruiterChecker