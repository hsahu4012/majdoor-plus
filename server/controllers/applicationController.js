const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyToJob = async (req, res) => {
    try {
        const { jobId, workerId } = req.body;

        const targetJob = await Job.findById(jobId);
        if (!targetJob) return res.status(404).json({ error: "Job not found" });

        const existingApp = await Application.findOne({ jobId, workerId });
        if (existingApp) return res.status(400).json({ error: "Already applied" });

        // Auto-cancel overlapping applications
        const overlappingApps = await Application.find({ workerId, status: "applied" }).populate("jobId");
        const sameDayOverlap = overlappingApps.filter(app => {
            const otherJob = app.jobId;
            return (
                otherJob.date.toISOString().split("T")[0] === targetJob.date.toISOString().split("T")[0] &&
                otherJob.time === targetJob.time
            );
        });

        for (const conflictApp of sameDayOverlap) {
            await Application.findByIdAndUpdate(conflictApp._id, { status: "cancelled" });
        }

        const application = await Application.create({ jobId, workerId });
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ error: "Apply failed", details: err.message });
    }
};

exports.getApplicationsByWorker = async (req, res) => {
    try {
        const apps = await Application.find({ workerId: req.params.workerId });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch applications" });
    }
};

exports.getApplicationsForJob = async (req, res) => {
    try {
        const apps = await Application.find({ jobId: req.params.jobId });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch job applicants" });
    }
};
