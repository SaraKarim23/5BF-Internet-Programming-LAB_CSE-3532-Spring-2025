import React, { useContext, useState } from 'react';
import './Navbar.css';
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';
import { AppContext } from '../context/AppContext';
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <i className='bx bx-plus-medical'></i>Healthcare session.
      </NavLink>
      <div className="navbar">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/alldoctor" className={({ isActive }) => isActive ? 'active' : ''}>
          All Doctors
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
          Contact Us
        </NavLink>
      </div>
      <div>
        {
          token && userData ? (<div className='profile-container'>
            <img src={userData.image} alt="profile " className='profile' />
            <i className="fa fa-caret-down dropdown-icon"></i>
            <div className='dropdown-manu'>
              <div>
                <p onClick={() => navigate('my-profile')}>My Profile</p>
                <p onClick={() => navigate('my-appointments')}>My Appointments</p>
                <p onClick={logout}>Logout</p>
                <p></p>
              </div>
            </div>
          </div>) : (<NavLink to="/login" className={({ isActive }) => isActive ? 'btn actiiva' : 'btn'}>
            Create Account
          </NavLink>)
        }
      </div>
    </header>
  );
};

export default Navbar;
