const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"]
  },
  city: {
    type: String,
    lowercase: true,
    trim: true
  }
})

module.exports =  userSchema;
