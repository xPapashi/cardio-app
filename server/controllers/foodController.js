const Food = require("../models/food");

// Add a food
const addFood = async (req, res) => {
  try {
    const { name, quantity, calorie, protein, carb, fat, user_id, createdAt } = req.body;

    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    if (!calorie) {
      return res.json({
        error: "Calorie is required",
      });
    }

    if (!protein) {
      return res.json({
        error: "Protein is required",
      });
    }

    if (!carb) {
      return res.json({
        error: "Carb is required",
      });
    }

    if (!fat) {
      return res.json({
        error: "Fat is required",
      });
    }

    const existingFood = await Food.findOne({
      name,
      user_id,
    });
    if (existingFood) {
      return res.json({
        error: "Food already exists",
      });
    }

    const newFood = await Food.create({
      name,
      quantity,
      calorie,
      protein,
      carb,
      fat,
      createdAt,
      user_id,
    });
    return res.json(newFood);
  } catch (error) {
    console.log(error);
  }
};

//get all foods by searching the user id and displaying all the foods that belong to that user
const getAllFoods = async (req, res) => {
  try {
    const { user_id, createdAt } = req.body;

    const foods = await Food.find({ user_id: user_id });
    //only display foods that were created on the same day as createdAT from req.body
    const filteredFoods = foods.filter((food) => {
      const foodDateString = food.createdAt.toISOString().split("T")[0];
      return foodDateString === createdAt;
    });

    return res.json(filteredFoods);
  } catch (error) {
    console.log(error);
  }
};

const updateFood = async (req, res) => {
  try {
    const { _id, name, quantity, calorie, protein, carb, fat } = req.body;
    const food = await Food.findByIdAndUpdate(_id, { name, quantity, calorie, protein, carb, fat });

    if (!food) {
      return res.json({
        error: "Food not found",
      });
    }
    return res.json(food);
  } catch (error) {
    console.log(error);
  }
};

const deleteFood = async (req, res) => {
  try {
    const { _id } = req.body;
    const food = await Food.findByIdAndDelete(_id);

    if (!food) {
      return res.json({
        error: "Food not found",
      });
    }
    return res.json(food);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFood,
  getAllFoods,
  updateFood,
  deleteFood,
};
