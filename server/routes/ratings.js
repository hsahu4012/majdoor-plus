const express = require("express");
const router = express.Router();
const { rateJob } = require("../controllers/ratingController");

router.post("/:jobId", rateJob);

module.exports = router;
