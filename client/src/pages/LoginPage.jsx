import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="">
        <div className="">
          <div className="">
            <h2></h2>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <button type="button">Login</button>
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
