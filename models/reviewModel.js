const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    recipeId:{
        type: ObjectId,
        ref: "recipeData",
        required:true
    },
    reviewer: {
        type: ObjectId,
        ref: "userData",
        required:true
    },
    review: {
        type: String
    },
    rate: {
        type: Number,
        min:1,
        max:5
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=reviewSchema;