import React from "react";
import "./DaysOfWeek.css";

function DaysOfWeek() {
  return (
    <>
      <div className="title-container">
        <div className="dow-title">DAYS</div>
      </div>
      <div className="dow-container">
        <div className="box">
          <button className="day">Mon</button>
          <button className="day">Tue</button>
          <button className="day">Wed</button>
          <button className="day">Thu</button>
          <button className="day">Fri</button>
          <button className="day">Sat</button>
          <button className="day">Sun</button>
        </div>
      </div>
    </>
  );
}

export default DaysOfWeek;
