const express = require("express");
const router = express.Router();
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getJobsByEmployer
} = require("../controllers/jobController");

router.post("/", createJob);
router.get("/", getJobs); // feed for workers
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.get("/employer/:employerId", getJobsByEmployer);
router.post("/cancel/:id", async (req, res) => {
    try {
        await Application.findByIdAndUpdate(req.params.id, { status: "cancelled" });
        res.json({ message: "Application cancelled" });
    } catch (err) {
        res.status(400).json({ error: "Failed to cancel" });
    }
});

module.exports = router;
