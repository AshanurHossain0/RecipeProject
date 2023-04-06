const express = require("express");

const authentication=require("../../middleware/auth")
const ReviewController = require("../../controllers/reviewController");

const router = express.Router();
const reviewController = new ReviewController();

/**
 * @route   POST & DELETE api/reviews
 * @desc    Register User
 * @access  users
 */
router.post("/",authentication,reviewController.createReview);

router.delete("/:reviewId",authentication,reviewController.deleteReview);

module.exports = router;