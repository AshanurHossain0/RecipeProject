const mongoose = require("mongoose");
const recipeSchema = require("./../models/recipeModel");
const reviewSchema = require("../models/reviewModel")
const recipeModel = mongoose.model("recipeData", recipeSchema);
const reviewModel = mongoose.model("reviewData", reviewSchema);

class RecipeController {
  constructor() {
  }
  async createRecipe(req, res) {
    try {
      let { name, items, process } = req.body;

      if (!name || !name.trim()) return res.status(400).send({ status: false, msg: "Recipe name is mandatory" })

      if (!process || !process.trim()) return res.status(400).send({ status: false, msg: "Please provide process" })

      items=items.filter((item)=>{
        return item.trim().length !=0
      })
      if (!items || items.length == 0) return res.status(400).send({ status: false, msg: "Items are mandatory" })

      let recipeDetails = { name: name, items: items, process: process, author: req.token.userId };

      let recipeData = await recipeModel.create(recipeDetails);
      return res.status(201).send({ status: true, msg: "Post successful", data: recipeData });
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  async getRecipe(req, res) {
    try {
      const recipeId = req.params.recipeId;
      const recipeData = await recipeModel.findOne({ _id: recipeId, isDeleted: false }).populate("author", { __v: 0, _id: 0, password: 0 }).select({ isDeleted: 0, __v: 0 });

      if (!recipeData) return res.status(404).send({ status: false, msg: "Recipe not found" });
      return res.status(200).send({ status: true, msg: "Success", data: recipeData })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  async searchRecipe(req, res) {
    try {
      let name = req.query.name;

      let queryObj = {}
      if (name) {
        queryObj.name = { "$regex": name, "$options": "i" };
      }
      queryObj.isDeleted = false;

      let allRecipes = await recipeModel.find(queryObj).populate("author", { __v: 0, password: 0 }).select({ isDeleted: 0, __v: 0 });

      if (allRecipes.length == 0) return res.status(404).send({ status: false, msg: "Recipe not found" });
      return res.status(200).send({ status: true, msg: "Success", data: allRecipes });
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  async deleteRecipe(req, res) {
    try {
      const recipeId = req.params.recipeId;

      const findRecipe = await recipeModel.findOne({ _id: recipeId, isDeleted: false });
      if (!findRecipe) return res.status(404).send({ status: false, msg: "No recipe found" });

      const authorId = req.token.userId;
      if (authorId != findRecipe.author) return res.status(403).send({ status: false, msg: "You can't delete other user's recipe" })

      await reviewModel.updateMany({ recipeId: recipeId }, { isDeleted: true });
      await recipeModel.findOneAndUpdate({ _id: recipeId }, { isDeleted: true });

      return res.status(200).send({ status: true, msg: "Deleted successfully" })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }
}

module.exports = RecipeController;