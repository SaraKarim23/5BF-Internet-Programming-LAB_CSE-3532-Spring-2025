import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const RelatedDoctors = ({speciality,docId}) => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
    const [relDoc,setRelDocs] = useState([])
    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }

    },[doctors,speciality,docId])
  return (
    <div className="top-doctor-container">
      <h1>Related Doctors</h1>
      <p>Simply browse through our extensive list of trusted doctors</p>
      <div className="doctor-grid">
        {relDoc.slice(0, 5).map((item, index) => (
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
  )
}

export default RelatedDoctors
