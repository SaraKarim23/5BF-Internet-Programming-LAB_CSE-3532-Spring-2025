import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import home from '../assets/home.png'
import appointment from '../assets/appointment_icon.png'
import add from '../assets/add_icon.png'
import people from '../assets/people.png'
import './Sidebar.css'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
    return (
        <div>
            {
                aToken && <ul className='sidbar-container'>
                    <NavLink to={'/admin-dashboard'}>
                        <img src={home} alt='' />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to={'/all-appointments'}>
                        <img src={appointment} alt='' />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink to={'/add-doctor'}>
                        <img src={add} alt='' />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink to={'/doctor-list'}>
                        <img src={people} alt='' />
                        <p>Doctors List</p>
                    </NavLink>

                </ul>
            }

              {
                dToken && <ul className='sidbar-container'>
                    <NavLink to={'/doctor-dashboard'}>
                        <img src={home} alt='' />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to={'/doctor-appointments'}>
                        <img src={appointment} alt='' />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink to={'/doctor-profile'}>
                        <img src={people} alt='' />
                        <p>Profile</p>
                    </NavLink>

                </ul>
            }
        </div>
    )
}

export default Sidebar
