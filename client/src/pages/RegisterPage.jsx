import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { checkLoggedIn } from "../components/auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    checkLoggedIn(setIsLoggedIn, navigate);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    try {
      const { data } = await axios.post("/Register", { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUserData({});
        toast.success(`Register Successfull. Welcome ${userData.name}`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registerContent">
      <div className="registerLeft">
        <div className="logo">
          <FontAwesomeIcon icon={faHeart} />
          <h1>CALORIELOVE</h1>
        </div>
        <div className="center">
          <div className="titleWelcome">Welcome</div>
          <div className="textParagraph">
            <p>Already have an account? Login to your account</p>
            <p>and start tracking your calories!</p>
          </div>
          <div className="loginButton">
            <button type="button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
        <div className="link">www.calorielove.com</div>
      </div>
      <div className="registerRight">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="registerInput">
            <input
              type="text"
              value={userData.name}
              required
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <label htmlFor="Name">Name</label>
          </div>
          <div className="registerInput">
            <input
              type="email"
              value={userData.email}
              required
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="registerInput">
            <input
              type="password"
              value={userData.password}
              required
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <label htmlFor="Password">Password</label>
          </div>
          <div className="registerSubmit">
            <button type="submit">REGISTER</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
