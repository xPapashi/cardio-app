import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Account() {
  const navigate = useNavigate();

  //prevent unauthorized access if user is not logged in and redirect to login page
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error: {error.message}</p>;
  if (!user) {
    toast.error("You must be logged in to view this page");
    navigate("/login");
  }

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
