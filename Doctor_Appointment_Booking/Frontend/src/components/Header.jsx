import React from 'react';
import home from '../assets/doctor.jpg';
import './Header.css'; 

const Header = () => {
  return (
    <section className="home">
  <img src={home} alt="Home" />
  <div className="content">
    <h1>Book Appointment<br />With Trusted Doctors</h1>
    <p>
      Finding the right doctor has never been easier! Our platform connects you
      with experienced and trusted medical professionals for hassle-free appointment
      booking. Get quality healthcare at your convenience—anytime, anywhere.
    </p>
    <a href="#speciality" className="btn">Book Appointment</a>
  </div>
</section>

  );
};

export default Header;
