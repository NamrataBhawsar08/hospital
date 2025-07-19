// BookDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

const handleCancel = async () => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/appointments/cancel/${appointmentId}`);
    if (res.status === 200) {
      navigate('/cancel-appointment'); // Navigate to cancel success page
    }
  } catch (error) {
    console.error('Cancel error:', error);
    alert('Failed to cancel the appointment. Try again later.');
  }
};

  return (
    <div>
      <h2>Appointment Confirmed!</h2>
      <p>Your Appointment ID is: <strong>{appointmentId}</strong></p>
      <p>We'll send you a confirmation email shortly.</p>

      {/* Cancel button */}
      <button onClick={handleCancel} style={{ marginTop: '20px', padding: '8px 16px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
        Cancel Appointment
      </button>
    </div>
  );
};

export default BookDetail;
