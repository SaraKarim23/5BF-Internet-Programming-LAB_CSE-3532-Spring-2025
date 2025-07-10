import React from 'react'
import about from '../assets/about.jpg'
import './About.css'
const About = () => {
  return (
    <div>
          <div className="about">
        <div className="about-container">
            <h1 className="about-heading">About Us</h1>
            <img src={about} alt=""/>
           <div className="right-side-about">
            <p>Welcome to <b>Booking.</b> We are committed to providing a seamless and efficient platform for booking appointments with trusted doctors. Our goal is to make healthcare accessible, convenient, and stress-free.</p>

            <h2>Why Choose Us?</h2>
            <ul>
                <li>1. Find trusted and verified doctors</li>
                <li>2. Book appointments easily and quickly</li>
                <li>3. Get reminders for your consultations</li>
                <li>4. Secure and private medical data</li>
            </ul>

            <p>Join us today and take control of your healthcare with ease and confidence!</p>
           </div>
            
        </div>
    </div>
    </div>
  )
}

export default About
