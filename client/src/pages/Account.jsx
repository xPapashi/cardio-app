import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchUserProfile } from "../components/auth/auth";

export default function Account() {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <main>
      <div className="accountContainer">
        <div className="accountTitle">
          <h1>Account</h1>
        </div>
        <div className="accountOptions">
          <ul>
            <li>
              <button>Test</button>
            </li>
            <li>
              <button>Change Calorie Goal</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
