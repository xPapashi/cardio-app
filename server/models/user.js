const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  calorieGoal: {
    type: Number,
    default: 2000,
  },
  carbGoal: {
    type: Number,
    default: 300,
  },
  proteinGoal: {
    type: Number,
    default: 100,
  },
  fatGoal: {
    type: Number,
    default: 70,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
