const mongoose = require("mongoose");
const recipeSchema = require("./../models/recipeModel");
const Recipe = mongoose.model("recipeData", recipeSchema);

class recipeController{
  constructor() {
  }
}

module.exports = recipeController;