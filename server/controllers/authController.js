const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Signup
exports.signup = async (req, res) => {
    try {
        const { mobile, password, role, securityQuestions } = req.body;

        const existing = await User.findOne({ mobile });
        if (existing) return res.status(400).json({ error: "Mobile already registered" });

        const hashedPassword = await hashPassword(password);
        const hashedSecurity = await Promise.all(
            securityQuestions.map(async (q) => ({
                questionId: q.questionId,
                answer: (await hashPassword(q.answer.trim().toLowerCase())),
            }))
        );

        const user = await User.create({
            mobile,
            password: hashedPassword,
            role,
            securityQuestions: hashedSecurity,
        });

        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: "Signup failed", details: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await User.findOne({ mobile });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Step 1: Get Questions
exports.getSecurityQuestions = async (req, res) => {
    try {
        const { mobile } = req.body;
        const user = await User.findOne({ mobile });
        if (!user) return res.status(404).json({ error: "User not found" });

        const questions = user.securityQuestions.map((q) => ({
            questionId: q.questionId,
        }));

        res.json({ questions });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch security questions" });
    }
};

// Step 2: Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { mobile, answers, newPassword } = req.body;
        const user = await User.findOne({ mobile });
        if (!user) return res.status(404).json({ error: "User not found" });

        const allCorrect = await Promise.all(
            user.securityQuestions.map(async (storedQ, index) => {
                return await comparePassword(answers[index].trim().toLowerCase(), storedQ.answer);
            })
        );

        if (allCorrect.includes(false)) return res.status(401).json({ error: "Answers don't match" });

        user.password = await hashPassword(newPassword);
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ error: "Reset failed" });
    }
};
