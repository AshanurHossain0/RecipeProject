const mongoose=require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const recipeSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    items:{
        type:[String],
        trim:true,
        lowercase:true,
        required:true
    },
    process:{
        type:String,
        trim:true,
        lowercase:true
    },
    author:{
        type:ObjectId,
        ref:"userData",
        required:true
    },
    rating:{
        type:Number
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=recipeSchema;