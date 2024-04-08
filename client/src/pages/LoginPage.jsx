import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.get("/");
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
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
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
