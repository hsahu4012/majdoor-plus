const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [longitude, latitude]
    },
    category: { type: String },
    wage: { type: Number },
    time: { type: String }, // morning, evening, full-day
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ["open", "closed", "expired", "cancelled"],
        default: "open",
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }, // auto-calculate 24h later
    ratingFromEmployer: {
        stars: { type: Number, min: 1, max: 5 },
        comment: { type: String }
    },
    ratingFromWorker: {
        stars: { type: Number, min: 1, max: 5 },
        comment: { type: String }
    },
    isFlagged: { type: Boolean, default: false },
}, {
    timestamps: true,
}
);

jobSchema.index({ location: "2dsphere" }); // for geolocation queries

module.exports = mongoose.model("Job", jobSchema);
