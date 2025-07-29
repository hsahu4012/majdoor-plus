// routes/notifications.js
const express = require("express");
const router = express.Router();
const { getNotifications, markAsRead } = require("../controllers/notificationController");

router.get("/", getNotifications);            // GET /api/notifications?userId=…
router.post("/:id/read", markAsRead);         // POST /api/notifications/:id/read
module.exports = router;
