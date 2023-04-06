const mongoose = require("mongoose");
const reviewSchema = require("./../models/reviewModel");
const recipeSchema = require("./../models/recipeModel");
const recipeModel = mongoose.model("recipeData", recipeSchema);
const reviewModel = mongoose.model("reviewData", reviewSchema);

class reviewController {
  constructor() {
  }
  async createReview(req, res) {
    try {
      let {review, rate } = req.body;
      let recipeId=req.params.recipeId;

      if (!review || !rate) return res.status(400).send({ status: false, msg: "review and rating is mandatory" });

      rate = rate - 0;
      const recipeData = await recipeModel.findOne({ _id: recipeId, isDeleted: false })

      if (!recipeData) return res.status(404).send({ status: false, msg: "Recipe not foumd" });

      req.body.reviewer = req.token.userId;

      const reviewData = await reviewModel.create({...req.body,recipeId:recipeId});

      let rating = (recipeData.rating || 0);

      rating = ((rating * recipeData.totalReview + rate) / (recipeData.totalReview + 1)).toFixed(2)
      await recipeModel.findOneAndUpdate({ _id: recipeId }, { rating: rating, $inc: { totalReview: 1 } })

      return res.status(200).send({ status: true, msg: "Review successful", data: reviewData });
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  async deleteReview(req, res) {
    try {
      const reviewId = req.params.reviewId;
      const userId=req.token.userId;

      const reviewData = await reviewModel.findOneAndUpdate({ _id: reviewId, reviewer:userId, isDeleted:false},{isDeleted:true});
      if (!reviewData) return res.status(403).send({ status: false, msg: "Deletion denied" });

      const recipeData= await recipeModel.findById(reviewData.recipeId);

      let rating = recipeData.rating;
      rating=((rating * recipeData.totalReview - reviewData.rate)/(recipeData.totalReview -1)).toFixed(2)
      await recipeModel.findOneAndUpdate({_id:recipeData._id},{rating:rating,$inc:{totalReview:-1}})

      return res.status(200).send({ status: true, msg: "Review deleted successfully" });
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }
}

module.exports = reviewController;