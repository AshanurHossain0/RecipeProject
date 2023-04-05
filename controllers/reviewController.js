const mongoose = require("mongoose");
const reviewSchema = require("./../models/reviewModel");
const Review = mongoose.model("reviewData", reviewSchema);

class reviewController{
  constructor() {
  }
}

module.exports = reviewController;