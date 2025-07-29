// controllers/notificationController.js
const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
    const { userId } = req.query;
    const notes = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notes);
};

exports.markAsRead = async (req, res) => {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Marked as read" });
};
