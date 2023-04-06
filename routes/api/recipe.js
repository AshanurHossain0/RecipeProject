const express = require("express");

const RecipeController = require("../../controllers/recipeController");
const authentication=require("../../middleware/auth")

const router = express.Router();
const recipeController = new RecipeController();

/**
 * @route   POST, GET, DELETE api/recipes
 * @desc    Register User
 * @access  users
 */
router.post("/",authentication,recipeController.createRecipe);

router.get("/:recipeId",authentication,recipeController.getRecipe);

router.get("/",authentication,recipeController.searchRecipe);

router.delete("/:recipeId",authentication,recipeController.deleteRecipe);

module.exports = router;