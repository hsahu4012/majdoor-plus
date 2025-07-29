const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Mobile must be 10 digits"],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["worker", "employer"],
        required: true,
    },
    securityQuestions: [
        {
            questionId: Number, // Refers to a static question list
            answer: String,     // Store hashed or normalized
        },
    ],
    isBanned: { type: Boolean, default: false },
    isFlagged: { type: Boolean, default: false },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
