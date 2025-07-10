import React, { useRef } from 'react';
import 'boxicons/css/boxicons.min.css';
import './Contact.css';

const Contact = () => {
  const careersRef = useRef(null);

  const scrollToCareers = () => {
    if (careersRef.current) {
      careersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us!</p>

        <div className="contact-info">
          <h3>Reach Us Directly</h3>
          <p> Phone: +8801234567890</p>
          <p>Email: appointmentbooking@gmail.com</p>
          <p>Address: 123 Healthcare Street, Dhaka, Bangladesh</p>
        </div>

        <div className="social-media">
          <a href="https://twitter.com" target="_blank">
            <i className='bx bxl-twitter'></i>
          </a>
          <a href="https://facebook.com" target="_blank">
            <i className='bx bxl-facebook'></i>
          </a>
          <a href="https://instagram.com" target="_blank">
            <i className='bx bxl-instagram'></i>
          </a>
        </div>


        <div className="jobs">
          <p className='first1'>Careers at Appointment Booking</p>
          <p className='first2'>Learn more about our team and open roles.</p>
          <button className='explore' onClick={scrollToCareers}>Explore Jobs</button>
        </div>

        <div ref={careersRef} className="careers-section">
          <h2>Join Our Team</h2>
          <p>We are always looking for talented people to join our mission of making healthcare easy and accessible for everyone.</p>
          <ul className='work'>
            <li>1. Frontend Developer</li>
            <li>2. Customer Support Specialist</li>
            <li>3. Marketing Executive</li>
          </ul>
          <p>If you're interested, send us your CV at <strong>careers@appointmentbooking.com</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
