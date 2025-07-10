import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import './AllAppointments.css'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext)
  const { calculatedAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="all-appointments-container">
      <h2 className="all-appointments-title">All Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Age</th>
            <th>Date & Time</th>
            <th>Doctor</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="patient-avatar"
                /><p>{item.userData.name}</p></td>
                <td>{calculatedAge(item.userData.dob)}</td>
                <td>{slotDateFormat(item.slotDate)} , {item.slotTime}</td>
                <td><img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="patient-avatar"
                /><p>{item.docData.name}</p></td>
                <td>৳{item.amount}</td>
                {
                  item.cancelled
                    ? <td><p className="cancelled-status">Cancelled</p></td>
                    : item.isCompleted 
                    ? <td><p className='complete'>Completed</p></td>
                    :<td className="actions-cell">
                      <button onClick={()=>cancelAppointment(item._id)} className="cancel">Cancel</button>
                    </td>
                }
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AllAppointments
