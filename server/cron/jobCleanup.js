const cron = require("node-cron");
const Job = require("../models/Job");

cron.schedule("*/10 * * * *", async () => {
    try {
        const now = new Date();
        const result = await Job.updateMany(
            { expiresAt: { $lte: now }, status: "open" },
            { status: "expired" }
        );
        if (result.modifiedCount > 0) {
            console.log(`[CRON] Expired ${result.modifiedCount} jobs`);
        }
    } catch (err) {
        console.error("[CRON] Error expiring jobs:", err.message);
    }
});
