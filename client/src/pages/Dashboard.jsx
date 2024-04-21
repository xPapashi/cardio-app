import React, { useState, useEffect } from "react";
import NutritionMeter from "../components/NutritionMeter";
import DaysOfWeek from "../components/DaysOfWeek";
import { fetchUserProfile } from "../components/auth/auth";
import { useNavigate } from "react-router-dom";
import { formatDate, formatMonth } from "../components/utils/Utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date(), true));
  const [dowTitle, setDowTitle] = useState(formatMonth(new Date()));
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    fetchUserProfile(setIsLoggedIn, "/login", navigate);
  }, [navigate]);

  return (
    <main>
      <DaysOfWeek onDaySelect={handleDaySelect} setDowTitle={setDowTitle}/>
      <NutritionMeter selectedDay={selectedDay} dowTitle={dowTitle} />
    </main>
  );
}