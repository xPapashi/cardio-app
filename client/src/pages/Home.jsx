import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };
 
  return (
    <main>
        <h1>Home Page!</h1>
        <button onClick={handleButtonClick}>Login</button>
    </main>
  );
}
