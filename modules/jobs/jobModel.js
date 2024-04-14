const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        start: {
            type: Number,
        },
        end: {
            type: Number,
        }
    },
    status: {
        type: String,
        default: "active"
    },
    details: {
        type: String,
    }
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema);
module.exports = Job