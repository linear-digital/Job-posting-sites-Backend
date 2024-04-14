const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    message: {
        type: String,
    }
}, { timestamps: true })

const Apply = mongoose.model("Apply", jobSchema);
module.exports = Apply