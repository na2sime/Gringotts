const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    website: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        enum: ["lesson", "event", "hobby"],
        default: "lesson"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Lesson", lessonSchema);