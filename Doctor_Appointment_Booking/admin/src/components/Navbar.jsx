import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {useNavigate} from 'react-router-dom'
import './Navbar.css'
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const {dToken , setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
    return (
        <div className="navbar">
            <div className="navbar-left">
                <i className='bx bx-plus-medical'></i>Healthcare session.
                <p>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <div className="navbar-right">
                <button onClick={logout} className="logout">Logout</button>
            </div>
        </div>
    )
}

export default Navbar
