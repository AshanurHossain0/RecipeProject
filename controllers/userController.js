const mongoose = require("mongoose");

const userSchema = require("./../models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { validName, validEmail, validGender, validPassword } = require("../validator")

const userModel = mongoose.model("userData", userSchema);

class UserController {
  constructor() {
  }
  async createUser(req, res) {
    try {
      let { fullName, email, password, gender, city } = req.body;

      if (!fullName) return res.status(400).send({ status: false, msg: "Full Name is mandatory" });
      if (!email) return res.status(400).send({ status: false, msg: "Email is mandatory" });
      if (!password || !password.trim()) return res.status(400).send({ status: false, msg: "Password is mandatory" });

      fullName = fullName.trim();
      if (!validName(fullName)) return res.status(400).send({ status: false, msg: "Invalid full name" });

      email = email.trim();
      if (!validEmail(email)) return res.status(400).send({ status: false, msg: "Invalid email" });

      if (!validPassword(password)) return res.status(400).send({ status: false, msg: "password length shoild be minimum:5, maximum:14" })

      if (gender) {
        if (!validGender(gender)) return res.status(400).send({ status: false, msg: "Please provide gender correctly" });
      }

      const emailFound = await userModel.findOne({ email: email })
      if (emailFound) return res.status(400).send({ status: false, msg: "Email already exist, please login to your account" });

      let hashing = bcrypt.hashSync(password, 8)

      let userDetails = { fullName: fullName, email: email, password: hashing, gender: gender, city: city }

      let userData = await userModel.create(userDetails);

      return res.status(201).send({ status: true, msg: "Successfully registered", data: userData })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  async loginUser(req, res) {
    try {
      let { email, password } = req.body;

      if (!email || !email.trim()) return res.status(400).send({ status: false, msg: "Please provide email" })
      if (!password || !password.trim()) return res.status(400).send({ status: false, msg: "Please provide password" })

      email = email.trim();
      password = password.trim();

      const findUser = await userModel.findOne({ email: email });
      if (!findUser) return res.status(404).send({ status: false, msg: "Email does not exist. If you have no account, SignUp at first" })

      let hash = findUser.password;

      let isCorrect = bcrypt.compareSync(password, hash)
      if (!isCorrect) return res.status(400).send({ status: false, message: "Password is incorrect" })

      let token = jwt.sign({
        userId: findUser._id.toString(),
        exp: Math.floor(Date.now() / 1000) + (12 * 60 * 60),
        iat: Math.floor(Date.now())
      }, 'recipesApp');

      res.setHeader("x-auth-key", token)

      return res.status(200).send({ status: true, msg: "Login successful", token: token });
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }
  async getUser(req, res) {
    try {
      const userData = await userModel.findById(req.token.userId).select("-password");
      return res.status(200).send({status:true,msg:"Success",data:userData})
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }
}

module.exports = UserController;
