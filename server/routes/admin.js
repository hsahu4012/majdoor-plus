const express = require("express");
const router = express.Router();
const {
    listUsers,
    banUser,
    listJobs,
    deleteJob,
    listApplications,
    deleteApplication,
    getStats
} = require("../controllers/adminController");

// User moderation
router.get("/users", listUsers);               // query: ?flagged=true
router.post("/users/:id/ban", banUser);

// Job moderation
router.get("/jobs", listJobs);                 // query: ?flagged=true
router.delete("/jobs/:id", deleteJob);

// Application moderation
router.get("/applications", listApplications); // query: ?flagged=true
router.delete("/applications/:id", deleteApplication);

// Stats
router.get("/stats", getStats);

module.exports = router;
