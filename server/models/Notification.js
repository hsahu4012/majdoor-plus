const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { 
    type: String, 
    enum: ["applied","accepted","rejected","expired","cancelled"], 
    required: true 
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
