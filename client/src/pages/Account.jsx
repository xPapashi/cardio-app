import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Account() {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(false);

  //prevent unauthorized access if user is not logged in and redirect to login page
  useEffect(() => {
    axios.get("/profile").then(({ data }) => {
      if (!data) {
        navigate("/login");
      } else {
        setIsLoggedIn(true);
      }
    });
  }, [navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/logout");
      toast.success("You have been logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Account</h1>
      <ul>
        <li>
          <button>Test</button>
        </li>
        <li>
          <button>Change Password</button>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </main>
  );
}
