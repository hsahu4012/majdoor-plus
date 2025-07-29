const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: "Failed to create job", details: err.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "open" });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: "Error fetching job" });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: "Failed to update job" });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete job" });
    }
};

exports.getJobsByEmployer = async (req, res) => {
    try {
        const jobs = await Job.find({ employerId: req.params.employerId });
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ error: "Could not fetch employer's jobs" });
    }
};
