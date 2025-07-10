import React, { useContext } from 'react'
import './TopDoctor.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctor = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  return (
    <div className="top-doctor-container">
      <h1>Top Doctors to Book</h1>
      <p>Connect with our top-rated doctors for expert care and hassle-free appointments.</p>
      <div className="doctor-grid">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)
          } key={index} className="doctor-card">
            <img src={item.image} alt={item.name} />
            <p className={`${item.available ? 'status' : 'nstatus'}`}>{item.available ? 'Available' : 'Not Available'}</p>
            <p>{item.name}</p>
            <p>{item.speciality}</p>
          </div>
        ))}
      </div>

      <button onClick={() => { navigate('/alldoctor'); scrollTo(0, 0) }} >More</button>
    </div>
  )
}

export default TopDoctor