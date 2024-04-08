import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <div className="">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="mail@email.com"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="********"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
