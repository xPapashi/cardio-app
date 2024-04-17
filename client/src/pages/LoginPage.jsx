import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { checkLoggedIn } from "../components/auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  }); // store form data

  //restrict access if user is already logged in and redirect to dashboard
  useEffect(() => {
    checkLoggedIn(navigate);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    const { email, password } = userData;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      }); // send email and password to server
      if (data.error) {
        toast.error(data.error); // error message
      } else {
        setUserData({}); // clear form
        toast.success(`Welcome back, ${data.name}`); // welcome message
        navigate("/dashboard"); // redirect to dashboard
      }
    } catch (error) {
      console.log(error); // log any errors
    }
  };

  return (
    <div className="loginContent">
      <div className="loginLeft">
        <div className="logo">
          <FontAwesomeIcon icon={faHeart} />
          <h1>CALORIELOVE</h1>
        </div>
        <div className="center">
          <div className="titleWelcome">Welcome</div>
          <div className="textParagraph">
            <p>Don't have an account? Create your account, it takes</p>
            <p>less than a minute!</p>
          </div>
          <div className="registerButton">
            <button type="button">Register Now</button>
          </div>
        </div>
        <div className="link">www.calorielove.com</div>
      </div>
      <div className="loginRight">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="loginInput">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div className="loginInput">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>
          <div className="rememberPass">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className="loginSubmit">
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
