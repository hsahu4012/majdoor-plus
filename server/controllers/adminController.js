const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// 1. List users (optionally only flagged)
exports.listUsers = async (req, res) => {
    const filter = {};
    if (req.query.flagged === "true") filter.isFlagged = true;
    const users = await User.find(filter).select("-password");
    res.json(users);
};

// 2. Ban / unban user
exports.banUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
        id,
        { isBanned: true },
        { new: true }
    ).select("-password");
    res.json({ message: "User banned", user });
};

// 3. List jobs (optionally only flagged)
exports.listJobs = async (req, res) => {
    const filter = {};
    if (req.query.flagged === "true") filter.isFlagged = true;
    const jobs = await Job.find(filter).populate("employerId", "mobile role");
    res.json(jobs);
};

// 4. Delete a job
exports.deleteJob = async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
};

// 5. List applications (optionally only flagged)
exports.listApplications = async (req, res) => {
    const filter = {};
    if (req.query.flagged === "true") filter.isFlagged = true;
    const apps = await Application.find(filter)
        .populate("jobId", "title")
        .populate("workerId", "mobile");
    res.json(apps);
};

// 6. Delete an application
exports.deleteApplication = async (req, res) => {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
};

// 7. Basic stats
exports.getStats = async (req, res) => {
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const usersByRole = await User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    const avgStars = await User.aggregate([
        { $match: { "rating.count": { $gt: 0 } } },
        { $project: { avg: "$rating.average" } },
        { $group: { _id: null, overallAvg: { $avg: "$avg" } } }
    ]);

    res.json({
        totalJobs,
        totalApplications,
        usersByRole,
        overallAverageRating: avgStars[0]?.overallAvg || 0
    });
};
