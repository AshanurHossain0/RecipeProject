const express = require("express");

const RecipeController = require("../../controllers/recipeController");
const authentication=require("../../middleware/auth")

const router = express.Router();
const recipeController = new RecipeController();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post("/",authentication,recipeController.createRecipe);

router.get("/",authentication,recipeController.getRecipe);

router.delete("/:recipeId",authentication,recipeController.deleteRecipe);

module.exports = router;