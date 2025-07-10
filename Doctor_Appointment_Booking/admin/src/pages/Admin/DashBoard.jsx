import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import './DashBoard.css'
import { AppContext } from '../../context/AppContext'
import appointments from '../../assets/appointment.png';
import patients from '../../assets/patients.png';
import doctor from '../../assets/doctor.png'

const DashBoard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-summary">
        <div className="summary-card">
          <img src={doctor} alt="Doctors" />
          <h3>Doctors</h3>
          <p>{dashData.doctors}</p>
        </div>
        <div className="summary-card">
          <img src={patients} alt="Patients" />
          <h3>Patients</h3>
          <p>{dashData.patients}</p>
        </div>
        <div className="summary-card">
          <img src={appointments} alt="Appointments" />
          <h3>Appointments</h3>
          <p>{dashData.appointments}</p>
        </div>
      </div>

      <div className="latest-appointments">
        <h3>Latest Bookings</h3>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.userData.name}</td>
                  <td>{item.docData.name}</td>
                  <td>{slotDateFormat(item.slotDate)}</td>
                  {
                    item.cancelled
                      ? <td><p className="cancelled-status">Cancelled</p></td>
                      : item.isCompleted
                        ? <td><p className='complete'>Completed</p></td>
                        : <td className="actions-cell">
                          <button onClick={() => cancelAppointment(item._id)} className="cancel">Cancel</button>
                        </td>
                  }
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No recent appointments.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashBoard
