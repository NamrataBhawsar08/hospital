import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    doctorName: "",
    date: "",
    time: "",
    reason: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/appointments/book", formData);

    if (res.status === 200) {
      const appointmentId = res.data.appointmentId;  
      alert("Appointment booked successfully!");
      navigate(`/bookdetail/${appointmentId}`);     
    }
  } catch (error) {
    console.error("Booking error:", error);
    alert("Booking failed. Please try again.");
  }
};

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Username" placeholder="Your Name" onChange={handleChange} required />
        <input type="text" name="doctorName" placeholder="Doctor Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <textarea name="reason" placeholder="Reason for visit" onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
