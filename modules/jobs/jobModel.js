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
    descs: {
        type: String,
        required: true
    },
    start: {
        type: Number,
        required: true
    },

    end: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema);
module.exports = Job