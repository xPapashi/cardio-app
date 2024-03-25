import React, { useState } from "react";
import NutritionMeter from "../components/NutritionMeter";
import DaysOfWeek from "../components/DaysOfWeek";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());

  return (
    <main>
      <DaysOfWeek onSelectDay={(day) => setSelectedDay(day)} />
      <NutritionMeter selectedDay={selectedDay} />
    </main>
  );
}

const getCurrentDay = () => {
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const dayName = days[currentDayIndex];
  const dayOfMonth = currentDate.getDate();

  return `${dayName} ${dayOfMonth}`;
};