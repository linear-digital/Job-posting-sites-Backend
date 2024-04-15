const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user',
        // roles ["recruiter", "user"]
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    others: {
        type: Object,
    },
    session: {
        type: Array,
    }

},{timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User