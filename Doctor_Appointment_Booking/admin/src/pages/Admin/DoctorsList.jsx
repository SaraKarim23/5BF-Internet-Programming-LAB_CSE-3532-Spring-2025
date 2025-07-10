import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import './DoctorsList.css'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="doctors-list-container">
      <h1>All Doctors</h1>
      <div className="doctors-grid">
        {doctors.map((item, index) => (
          <div className="doctor-card" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="doctor-info">
              <p><strong>{item.name}</strong></p>
              <p>{item.speciality}</p>
              <div className="availability">
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} readOnly />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
