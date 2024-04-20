import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchUserProfile } from "../components/auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/modal/Modal";
import "./Account.css";

export default function Account() {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchUserProfile(setIsLoggedIn, "/login", navigate);
  }, [navigate]);

  //create asynchronouse logout function that sends a post request to the server and logs the user out
  //then clear the cookie and token and redirect to the login page
  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      localStorage.clear("token");
      toast.success("You have been logged out");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calories = e.target.calories.value;
    try {
      await axios.put("/setCalorieGoal", { calorieGoal: calories });
    } catch (error) {
      console.log(error);
    }
    console.log(calories);
    setIsOpen(false);
  };

  return (
    <main>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <div className="calorieGoalModal">
            <div className="calorieGoalTitle">
              <h1>CHANGE CALORIE GOAL</h1>
              <button type="button" onClick={handleClose}>
                X
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="calorieGoalInput">
                <input type="number" id="calories" name="calories" required/>
                <label htmlFor="calories">CALORIES</label>
              </div>
              <div className="calorieGoalSubmit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div className="accountContainer">
        <div className="accountTitle">
          <h1>Account</h1>
        </div>
        <div className="profile">
          <div className="avatar">
            <FontAwesomeIcon icon={faUser} size="7x" />
          </div>
        </div>
        <div className="accountOptions">
          <button onClick={() => setIsOpen(true)}>Change Calorie Goal</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </main>
  );
}
