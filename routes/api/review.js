const express = require("express");

const authentication=require("../../middleware/auth")
const ReviewController = require("../../controllers/reviewController");

const router = express.Router();
const reviewController = new ReviewController();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post("/",authentication,reviewController.createReview);

module.exports = router;