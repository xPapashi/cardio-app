import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  }); // store form data

  //restrict access if user is already logged in and redirect to dashboard
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await axios.get("/profile");
        if (data.email) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoggedIn();
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
    <main>
      <div className="">
        <div className="">
          <div className="">
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@mail.com"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              </div>
              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
              </div>
              <div className="">
                <button type="submit">Login</button>
              </div>
              {/* {error && <div>{error}</div>} */}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;