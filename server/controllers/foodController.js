const mongoose = require("mongoose");
const Food = require("../models/food");

// Get all foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({ user_id: req.user._id });
    res.json(foods);
  } catch (error) {
    console.log(error);
  }
};

// Get food by id  
const getFoodById = async (req, res) => {
    const {foodId} = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(food)) {
        return res.status(404).json({ error: "Invalid food ID!" });
    }

  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
        return res.status(404).json({ error: "Food not found!" });
    }
    res.json(food);
  } catch (error) {
    console.log(error);
  }
};

// Add a food
const addFood = async (req, res) => {
  try {
    const { name, amount, calorie, protein, carb, fat, createdAt } = req.body;
    const newFood = new Food({
      name,
      amount,
      calorie,
      protein,
      carb,
      fat,
      createdAt,
      user_id: req.user._id,
    });
    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (error) {
    console.log(error);
  }
};

// Update a food
const updateFood = async (req, res) => {
  try {
    const { name, amount, calorie, protein, carb, fat, createdAt } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        amount,
        calorie,
        protein,
        carb,
        fat,
        createdAt,
      },
      { new: true }
    );
    res.json(updatedFood);
  } catch (error) {
    console.log(error);
  }
};

// Delete a food
const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    res.json(deletedFood);
  } catch (error) {
    console.log(error);
  }
};

// Get foods by date
const getFoodsByDate = async (req, res) => {

  try {
    const foods = await Food.find({
      user_id: req.user._id,
      createdAt: {
        $gte: new Date(req.params.date),
        $lt: new Date(req.params.date).setDate(new Date(req.params.date).getDate() + 1),
      },
    });
    res.json(foods);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFoods,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
  getFoodsByDate,
};