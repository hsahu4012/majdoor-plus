const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["applied", "accepted", "rejected", "cancelled", "completed"],
        default: "applied"
    },
    appliedAt: { type: Date, default: Date.now },
    isFlagged: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);
