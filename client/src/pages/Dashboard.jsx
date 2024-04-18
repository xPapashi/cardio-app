import React, { useState, useEffect } from "react";
import NutritionMeter from "../components/NutritionMeter";
import DaysOfWeek from "../components/DaysOfWeek";
import { fetchUserProfile } from "../components/auth/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    fetchUserProfile(setIsLoggedIn, "/login", navigate);
  }, [navigate]);



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