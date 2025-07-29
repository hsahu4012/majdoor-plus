const Job = require("../models/Job");
const User = require("../models/User");

exports.rateJob = async (req, res) => {
    const { jobId } = req.params;
    const { role, stars, comment, raterId } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: "Job not found" });

        if (role === "employer") {
            if (job.ratingFromEmployer) return res.status(400).json({ error: "Already rated" });
            job.ratingFromEmployer = { stars, comment };
            await updateUserRating(job.workerId, stars);
        } else if (role === "worker") {
            if (job.ratingFromWorker) return res.status(400).json({ error: "Already rated" });
            job.ratingFromWorker = { stars, comment };
            await updateUserRating(job.employerId, stars);
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        await job.save();
        res.json({ message: "Rating submitted" });
    } catch (err) {
        res.status(400).json({ error: "Failed to rate", details: err.message });
    }
};

async function updateUserRating(userId, newStars) {
    const user = await User.findById(userId);
    const { average, count } = user.rating;
    const totalStars = average * count + newStars;
    const newCount = count + 1;
    user.rating.average = totalStars / newCount;
    user.rating.count = newCount;
    await user.save();
}
