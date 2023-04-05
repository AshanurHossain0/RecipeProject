const express = require("express");

const RecipeController = require("../../controllers/recipeController");

const router = express.Router();
const recipeController = new RecipeController();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post("/");

module.exports = router;