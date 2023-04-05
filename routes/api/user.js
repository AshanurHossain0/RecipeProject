const express = require("express");
const authentication=require("../../middleware/auth")
const UserController = require("../../controllers/userController");

const router = express.Router();
const userController = new UserController();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post("/register",userController.createUser);
router.post("/login",userController.loginUser);

module.exports = router;
