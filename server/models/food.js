const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  calorie: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carb: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  }
});

// Create food model using the foodSchema
const FoodModel = mongoose.model("Food", foodSchema);

module.exports = FoodModel;
