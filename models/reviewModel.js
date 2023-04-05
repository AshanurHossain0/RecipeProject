const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    recipeId:{
        type: ObjectId,
        ref: "recipeData",
        trim: true
    },
    reviewer: {
        type: ObjectId,
        ref: "userData"
    },
    review: {
        type: String
    },
    rate: {
        type: Number
    }
})

module.exports=reviewSchema;