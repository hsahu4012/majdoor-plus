const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./cron/jobCleanup");

const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const errorHandler = require("./middlewares/errorHandler");


const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const ratingRoutes = require("./routes/ratings");
const notificationRoutes = require("./routes/notifications");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Protected middleware
const { verifyToken } = require("./middlewares/auth");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", verifyToken, jobRoutes);
app.use("/api/applications", verifyToken, applicationRoutes);
app.use("/api/ratings", verifyToken, ratingRoutes);
app.use("/api/notifications", verifyToken, notificationRoutes);
app.use("/api/admin", verifyToken, adminRoutes);


// Error handling
app.use(errorHandler);




app.get("/", (req, res) => {
    res.send("Hello from Majdoor+ backend");
});

if (require.main === module) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
            const port = process.env.PORT || 5000;
            app.listen(port, () => console.log(`Server running on port ${port}`));
        })
        .catch(err => {
            console.error("MongoDB connection error:", err);
            process.exit(1);
        });
}

// Export for testing
module.exports = app;
