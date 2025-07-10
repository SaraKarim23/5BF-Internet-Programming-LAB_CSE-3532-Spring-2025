import React, { useContext, useEffect, useState } from 'react'
import './Alldoctor.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Alldoctor = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])
  return (
    <div>
      <div className="doctor">
        <div className="left-side-doctor">
          <p>Browse Through The Doctor Specialist</p>
          <ul className="specialist">
            <li onClick={() => speciality === 'General Physician' ? navigate('/alldoctor') : navigate('/alldoctor/General Physician')}>Genral Physician</li>
            <li onClick={() => speciality === 'Gynecologist' ? navigate('/alldoctor') : navigate('/alldoctor/Gynecologist')}>Gynecologist</li>
            <li onClick={() => speciality === 'Dermatologist' ? navigate('/alldoctor') : navigate('/alldoctor/Dermatologist')}>Dermatologist</li>
            <li onClick={() => speciality === 'Pediatrician' ? navigate('/alldoctor') : navigate('/alldoctor/Pediatrician')}>Pediatrician</li>
            <li onClick={() => speciality === 'Neurologist' ? navigate('/alldoctor') : navigate('/alldoctor/Neurologist')}>Neurologist</li>
            <li onClick={() => speciality === 'Gastroenterologist' ? navigate('/alldoctor') : navigate('/alldoctor/Gastroenterologist')}>Gastroenterologist</li>
          </ul>
        </div>
        <div className='right-side-doctor'>
          <div className="doctor-grid">
            {filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)
              } key={index} className="doctor-card">
                <img src={item.image} alt={item.name} />
                <p className={`${item.available ? 'status' : 'nstatus'}`}>{item.available ? 'Available' : 'Not Available'}</p>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alldoctor