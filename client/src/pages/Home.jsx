import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="mainContent">
      <div className="mainLeft">
        <div className="welcome">
          <h1>We Are The Next</h1>
          <h1>Generation Of</h1>
          <h1>Healthy Lifestyle</h1>
        </div>
        <div className="homeLogin">
          <button onClick={handleButtonClick}>START</button>
        </div>
      </div>
      <div className="mainRight">
        <div className="image">
          <img src="/homeCupcake.png" alt="" />
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}
