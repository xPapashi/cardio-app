import React from "react";
import { useState } from "react";
import MealList from "../MealList";
import "./RecipeGenerator.css";

export default function RecipeGenerator() {
  const [mealData, setMealData] = useState(null);
  const [calorieData, setCalorieData] = useState(3000);

  function handleChange(e) {
    setCalorieData(e.target.value);
  }

  function getMeals() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=8c9e2030a89b49bab9b757750079c0e4&timeFrame=day&targetCalories=${calorieData}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
        console.log(data);
      })
      .catch(() => {
        console.log("ERROR: Failed to capture meal data from API!");
      });
  }

  return (
    <section className="controls">
      <h1>Calorie Recipe Generator</h1>
      <input type="number" placeholder="Calories: 3000" onChange={handleChange} />
      <button className="text-white px-4" onClick={getMeals}>
        Generate Meals
      </button>
      {mealData && <MealList mealData={mealData} />}
    </section>
  );
}
