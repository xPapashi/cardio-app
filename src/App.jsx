import { useState } from "react";
import MealList from "./MealList";
import "./App.css";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calorieData, setCalorieData] = useState(3000);

  function handleChange(e) {
    setCalorieData(e.target.value);
  }

  function getMeals() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cefdcf1523d24d46bb1690178d953780&timeFrame=day&targetCalories=${calorieData}`
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
    <>
      <div className="App">
        <section className="controls">
          <input type="number" placeholder="Calories: 3000" onChange={handleChange} />
          <button onClick={getMeals}>Generate Meals</button>
        </section>
      </div>
    </>
  );
}

export default App;
