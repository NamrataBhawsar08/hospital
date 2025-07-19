import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1>🏥 Hospital Appointment System</h1>
        <p>Your health, our priority. Book appointments easily and quickly.</p>
        <img src="/images/hospital-banner.jpg" alt="Hospital Banner" className="home-banner-img" />
      </header>

      <section className="home-info">
        <div className="info-box">
          <img src="/images/" alt="Patients" className="info-img" />
          <h2>For Patients</h2>
          <p>
            Register and find available doctors to book an appointment. Manage
            your bookings and access your health information.
          </p>
        </div>

        <div className="info-box">
          <img src="/images/doctor.png" alt="Doctors" className="info-img" />
          <h2>For Doctors</h2>
          <p>
            Create your profile and manage appointments with your patients
            directly through our system.
          </p>
        </div>
      </section>

      <section className="home-actions">
        <Link to="/registration" className="home-button">Register</Link>
        <Link to="/login" className="home-button">Login</Link>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Hospital Appointment System</p>
      </footer>
    </div>
  );
};

export default Home;
