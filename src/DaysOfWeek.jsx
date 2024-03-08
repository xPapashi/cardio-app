import React, {useState} from "react";
import "./DaysOfWeek.css";

// function DaysOfWeek() {
//   return (
//     <>
//       <div className="title-container">
//         <div className="dow-title">DAYS</div>
//       </div>
//       <div className="dow-container">
//         <div className="box">
//           <button className="day">Mon</button>
//           <button className="day">Tue</button>
//           <button className="day">Wed</button>
//           <button className="day">Thu</button>
//           <button className="day">Fri</button>
//           <button className="day">Sat</button>
//           <button className="day">Sun</button>
//         </div>
//       </div>
//     </>
//   );
// }
function DaysOfWeek({ onSelectDay }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (daysToAdd) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + daysToAdd);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    return `${dayName} ${dayOfMonth}`;
  };

  const formatMonth = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()];
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
              onClick={() => onSelectDay(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index)))}
            >
              {formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index))}
            </button>
          ))}
          <button onClick={() => handleDateChange(1)}>&gt;</button>
        </div>
      </div>
    </>
  );
}

export default DaysOfWeek;