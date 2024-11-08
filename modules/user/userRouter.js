const authChecker = require('../../util/authChecker')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('./userModel')
const tokenProvider = require('../../util/tokenProvider')


router.get('/', authChecker, async (req, res) => {
    
    try {
        const data = await User.find({})
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.get('/me', authChecker, async (req, res) => {
    const email = req.user?.email

    try {
        const user = await User.findOne({ email: email })
        .select({password: 0, session: 0})
        .exec()
        res.send(user)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.post('/register', async (req, res) => {
    const body = req.body

    try {
 
        const hashedPassword = await bcrypt.hash(body.password, 10)

        const newUser = new User({
            ...body, password: hashedPassword
        })
        const isExist = await User.findOne({ phone: body.phone })
        if (isExist) {
            res.status(400).json({ message: "User Already Exist" })
        }
        else {
            const result = await newUser.save()
            const token = await tokenProvider(result)

            res.cookie('accessToken', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, domain: "volunteering-society.netlify.app" });
            res.send({ message: "User Created Success", token })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            $or: [
                { phone: email },
                { email: email }
            ]
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
          const token = await tokenProvider(user)
            // Set a cookie
            res.cookie('accessToken', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, domain: "volunteering-society.netlify.app" });
            const data = await User.findOne({ email: user.email })
                .select("-password")
                .exec();
            res.status(200).send({ user: data, message: "Login Success", token })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// update a user

router.put('/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id
    try {
        const data = await User.findByIdAndUpdate(id, body, { new: true })
        res.send({data, message: "User Updated Success"})
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router