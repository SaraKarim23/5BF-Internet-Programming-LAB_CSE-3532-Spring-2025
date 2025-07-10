import React, { useContext, useEffect } from 'react';
import './DoctorDashboard.css';
import { DoctorContext } from '../../context/DoctorContext';
import earnings from '../../assets/earning.png';
import appointments from '../../assets/appointment.png';
import patients from '../../assets/patients.png';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Doctor Dashboard</h2>

      <div className="dashboard-summary">
        <div className="summary-card">
          <img src={earnings} alt="Earnings" />
          <h3>Earnings</h3>
          <p>৳ {dashData.earnings}</p>
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
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashData.latestAppointments?.length > 0 ? (
              dashData.latestAppointments.map((item, index) => {
               
                const cannotCancel = ['bkash', 'nagad', 'rocket'].includes(item.paymentMethod);

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.userData.image} alt={item.userData.name} className="patient-avatar" />
                      {item.userData.name}
                    </td>
                    <td>{slotDateFormat(item.slotDate)}</td>
                    {item.cancelled ? (
                      <td><p className="cancelled">Cancelled</p></td>
                    ) : item.isCompleted ? (
                      <td><p className="completed">Completed</p></td>
                    ) : (
                      <td className="accptandcan">
                        {!cannotCancel && (
                          <button onClick={() => cancelAppointment(item._id)}>Cancel</button>
                        )}
                        <button onClick={() => completeAppointment(item._id)}>Complete</button>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No recent appointments.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
