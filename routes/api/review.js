const express = require("express");

const ReviewController = require("../../controllers/reviewController");

const router = express.Router();
const reviewController = new ReviewController();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.get("/");

module.exports = router;