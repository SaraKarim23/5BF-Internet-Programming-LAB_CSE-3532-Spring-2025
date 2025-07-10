import React from 'react';
import banner from '../assets/banner.png';
import './Banner.css';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    
    return (
        <div className="banner-wrapper">
            <div className="banner-container">
                <div className="banner-text">
                    <p className="book1">Book Appointment</p>
                    <p className="trust">With 100+ Trusted Doctors</p>
                    <button 
                        onClick={() => { 
                            navigate('/login'); 
                            window.scrollTo(0, 0); 
                        }}>
                        <b>Create Account</b>
                    </button>
                </div>
                <div className="banner-image">
                    <img src={banner} alt="Doctor Banner" />
                </div>
            </div>
        </div>
    );
}

export default Banner;
