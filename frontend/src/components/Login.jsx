import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      alert("Login successful!");
      console.log("User data:", res.data);
      navigate("/book-appointment");
    } catch (error) {
      alert("Login failed! Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h1 className="main-heading">Welcome Back!</h1>
        <p className="sub-heading">Please login to continue booking your appointment.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
