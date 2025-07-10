import React from 'react'
import 'boxicons/css/boxicons.min.css'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer-container">
  <div className="footer-columns">
    <div className="left-side-footer">
      <p className="logo1"><i className="bx bx-plus-medical"></i>Healthcare session.</p>
      <p className="logo2">Welcome to MediConnect, your trusted partner in healthcare. We simplify your medical journey by helping you book appointments with 100+ verified doctors across various specialties</p>
    </div>
    <div className="center-side-footer">
      <p>COMPANY</p>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
    <div className="right-side-footer">
      <p>GET IN TOUCH</p>
      <ul>
        <li>+8801234567890</li>
        <li>appointmentbooking@gmail.com</li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <hr />
    <p>Copyright 2025@ appointment_booking - All Right Reserved</p>
  </div>
</div>

  )
}

export default Footer
