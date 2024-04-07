import React, { useState, useEffect } from "react";

export default function Meal({ meal }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=8c9e2030a89b49bab9b757750079c0e4`
    )
      .then((response) => response.json())
      .then((data) => {
        setImgUrl(data.image);
      })
      .catch(() => {
        console.log("Could not fetch API for recipe meal information!");
      });
  }, [meal.id]);

  return (
    <>
      <article>
        <h1>{meal.title}</h1>
        <img src={imgUrl} alt="recipe" />
        <ul>
          <li>Preparation Time: {meal.readyInMinutes} minutes</li>
          <li>Number of servings: {meal.servings}</li>
        </ul>

        <a href={meal.sourceUrl}>Go to Recipe!</a>
      </article>
    </>
  );
}
