const jwt = require('jsonwebtoken')
const User = require('../modules/user/userModel')

const secret = process.env.JWT_SECRET

const tokenProvider = async (user) => {
    const sessionId = Math.random().toString(36).slice(2);
    await User.updateOne({ _id: user._id }, { $push: { session: sessionId } });
    
    const accessToken = jwt.sign({ email: user.email, phone: user.phone }, secret)
    return accessToken
}

module.exports = tokenProvider