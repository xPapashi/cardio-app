const Food = require("../models/food");

// Add a food
const addFood = async (req, res) => {
  try {
    const { name, quantity, calorie, protein, carb, fat, user_id } = req.body;

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
      createdAt: new Date(),
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
    const { user_id } = req.body;
    const foods = await Food.find({user_id: user_id});
    return res.json(foods);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFood,
  getAllFoods,
};
