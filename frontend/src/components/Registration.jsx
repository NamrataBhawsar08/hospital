import React, { useState } from "react";
import axios from "axios";
import './Registration.css';

const Register = () => {
    const [user, setUser] = useState({
      email:"",
    username: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration successful!");
      setUser({ email:"", username: "", password: "", role: "patient" });
    } catch (error) {
      alert("Registration failed!");
    }
  };

    return (
      
        <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
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
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
