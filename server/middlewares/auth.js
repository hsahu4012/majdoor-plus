const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Verify token and attach user to request
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { userId, role }
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// Role-based guards
exports.isWorker = (req, res, next) => {
    if (req.user.role !== "worker") return res.status(403).json({ error: "Access denied" });
    next();
};
exports.isEmployer = (req, res, next) => {
    if (req.user.role !== "employer") return res.status(403).json({ error: "Access denied" });
    next();
};
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access required" });
    next();
};