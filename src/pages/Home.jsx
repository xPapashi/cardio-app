import React from "react";
import NutritionMeter from "../NutritionMeter";
import DaysOfWeek from "../DaysOfWeek";

export default function Home() {
  return (
    <main>
      <DaysOfWeek />
      <NutritionMeter />
    </main>
  );
}
