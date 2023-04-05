const mongoose = require("mongoose");
const reviewSchema = require("./../models/reviewModel");
const recipeSchema = require("./../models/recipeModel");
const recipeModel = mongoose.model("recipeData", recipeSchema);
const reviewModel = mongoose.model("reviewData", reviewSchema);

class reviewController{
  constructor() {
  }
  async createReview(req,res){
    let {recipeId,review,rate}=req.body;
    

    if(!recipeId) return res.status(400).send({status:false,msg:"recipeId is mandatory"});
    if(!review || !rate) return res.status(400).send({status:false,msg:"review and rating is mandatory"});

    rate=rate-0;
    const recipeData=await recipeModel.findOne({_id:recipeId,isDeleted:false})

    if(!recipeData) return res.status(404).send({status:false,msg:"Recipe not foumd"});

    req.body.reviewer=req.token.userId;

    const reviewData=await reviewModel.create(req.body);

    let rating=(recipeData.rating || 0);

    rating=((rating * recipeData.totalReview +rate)/(recipeData.totalReview +1)).toFixed(1)
    await recipeModel.findOneAndUpdate({_id:recipeId},{rating:rating, $inc:{totalReview:1}})

    return res.status(200).send({status:true,msg:"Review successful",data:reviewData});
  }
}

module.exports = reviewController;