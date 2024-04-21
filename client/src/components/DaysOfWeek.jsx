import React, { useState } from "react";
import { formatMonth, formatDate } from "./utils/Utils";
import "./DaysOfWeek.css";

function DaysOfWeek(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const selectDay = (day) => {
    setSelectedDay(day);
    props.onDaySelect(day);
    props.setDowTitle(formatMonth(currentDate));
  };

  const handleDateChange = (daysToAdd) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + daysToAdd);
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className="title-container">
        <div className="dow-title">{formatMonth(currentDate)}</div>
      </div>
      <div className="dow-container">
        <div className="box">
          <button onClick={() => handleDateChange(-1)}>&lt;</button>
          {Array.from({ length: 7 }, (_, index) => (
            <button
              className="day"
              key={index}
              onClick={() =>
                selectDay(
                  formatDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      currentDate.getDate() + index
                    ),
                    true
                  )
                )
              }
            >
              {formatDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate() + index
                )
              )}
            </button>
          ))}
          <button onClick={() => handleDateChange(1)}>&gt;</button>
        </div>
      </div>
    </>
  );
}

export default DaysOfWeek;
