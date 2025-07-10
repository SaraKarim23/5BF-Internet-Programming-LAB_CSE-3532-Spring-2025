import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import './DoctorAppointments.css';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext);
  const { calculatedAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="doctor-appointments-container">
      <h2 className="doctor-appointments-title">My Appointments</h2>
      <table className="doctor-appointments-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Payment</th>
            <th>Age</th>
            <th>Date & Time</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments
              .slice() 
              .reverse()
              .map((item, index) => {
                const cannotCancel = ['bkash', 'nagad', 'rocket'].includes(
                  item.paymentMethod
                );

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="patient-info">
                      <img
                        src={item.userData.image}
                        alt={item.userData.name}
                        className="patient-avatar"
                      />
                      <p>{item.userData.name}</p>
                    </td>
                    <td>{item.paymentMethod}</td>
                    <td>{calculatedAge(item.userData.dob)}</td>
                    <td>
                      {slotDateFormat(item.slotDate)} , {item.slotTime}
                    </td>
                    <td>৳{item.amount}</td>
                    {item.cancelled ? (
                      <td>
                        <p className="cancelled">Cancelled</p>
                      </td>
                    ) : item.isCompleted ? (
                      <td>
                        <p className="completed">Completed</p>
                      </td>
                    ) : (
                      <td className="accptandcan">
                        {!cannotCancel && (
                          <button
                            onClick={() => cancelAppointment(item._id)}
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => completeAppointment(item._id)}
                        >
                          Complete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan="7">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;
