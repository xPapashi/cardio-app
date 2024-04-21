export const roundTwoDecimalPlaces = (value) => {
  return Math.round(value * 100) / 100;
};

export const formatDate = (date, fullday = false) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const fullDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const dayIndex = date.getDay();
  const day = fullday ? fullDays[dayIndex] : days[dayIndex];
  const dayOfMonth = date.getDate();
  return `${day} ${dayOfMonth}`;
};

export const formatMonth = (date) => {
  const months = [
    "JANURAY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  return months[date.getMonth()];
};

export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

//function that converts month name to number

export const monthToNum = (month) => {
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const monthIndex = monthNames.indexOf(month) + 1;
  return monthIndex.toString().padStart(2, "0");
}

//display correct date format
export const splitDate = (day) => {
  return day.split(" ")[1];
}

export const convertDate = (day, month, year) => {
  return `${year}-${monthToNum(month)}-${splitDate(day)}`;
}