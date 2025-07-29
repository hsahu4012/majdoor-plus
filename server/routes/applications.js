const express = require("express");
const router = express.Router();
const {
    applyToJob,
    getApplicationsByWorker,
    getApplicationsForJob
} = require("../controllers/applicationController");

router.post("/", applyToJob);
router.get("/worker/:workerId", getApplicationsByWorker);
router.get("/job/:jobId", getApplicationsForJob);

module.exports = router;
