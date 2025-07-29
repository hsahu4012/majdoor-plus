const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    getSecurityQuestions,
    resetPassword,
} = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes for Majdoor+
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user with mobile, password, role, and security questions
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *               - role
 *               - securityQuestions
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *               role:
 *                 type: string
 *                 example: "worker"
 *               securityQuestions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       example: "q1"
 *                     answer:
 *                       type: string
 *                       example: "blue"
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Mobile already registered
 *       500:
 *         description: Signup failed
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with mobile and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: User not found
 *       401:
 *         description: Incorrect password
 *       500:
 *         description: Login failed
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/get-security-questions:
 *   post:
 *     summary: Get security question IDs for a mobile number (used for password reset)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Security questions returned
 *       404:
 *         description: User not found
 *       500:
 *         description: Could not fetch security questions
 */
router.post("/get-security-questions", getSecurityQuestions);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using answers to security questions
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - answers
 *               - newPassword
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               answers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["blue", "pizza"]
 *               newPassword:
 *                 type: string
 *                 example: "newSecurePassword"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       401:
 *         description: Answers don't match
 *       404:
 *         description: User not found
 *       500:
 *         description: Reset failed
 */
router.post("/reset-password", resetPassword);

module.exports = router;
