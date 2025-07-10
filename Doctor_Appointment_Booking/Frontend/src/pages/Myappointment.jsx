import React, { useContext, useEffect, useState } from 'react';
import './Myappointment.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import bkash from '../assets/bkash.png';
import nogod from '../assets/nogod.png';
import rocket from '../assets/rocket.png';
import cash from '../assets/cash.png';

const Myappointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePaymentClick = async (method, appointmentId) => {
    setPaymentMethod(method);

    if (method === 'cash') {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/confirm-payment`,
          { appointmentId, paymentMethod: 'cash', transactionId: '' },
          { headers: { token } }
        );
        if (data.success) {
          toast.success(data.message);
          setShowPaymentForm(null);
          setPaymentMethod('');
          getUserAppointments();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      return;
    }

    let url = '';
    if (method === 'bkash') url = 'https://www.bkash.com/';
    else if (method === 'nagad') url = 'https://nagad.com.bd/';
    else if (method === 'rocket') url = 'https://www.dutchbanglabank.com/rocket/rocket.html';

    window.open(url, '_blank');
  };

  const handleConfirmPayment = async (appointmentId) => {
    if (!paymentMethod || !transactionId) {
      toast.error("Select payment method and enter transaction ID");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/confirm-payment`,
        { appointmentId, paymentMethod, transactionId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setShowPaymentForm(null);
        setPaymentMethod('');
        setTransactionId('');
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className='appointment-container1'>
      <h2 className='appointment-heading'>My Appointments</h2>
      <div className='appointments-list'>
        {appointments.map((item, index) => (
          <div className='appointment-card' key={index}>
            <div className='appointment-image-section'>
              <img src={item.docData.image} alt={item.docData.name} className='appointment-doctor-img' />
            </div>
            <div className='appointment-details'>
              <p className='doctor-name1'>{item.docData.name}</p>
              <p className='doctor-speciality1'>{item.docData.speciality}</p>
              <p className='doctor-label'>Address:</p>
              <p className='doctor-address'>{item.docData.address}</p>
              <p className='appointment-date-time'>
                <span>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
              <p><b>Status:</b> {item.paymentStatus}</p>
            </div>

            <div className='appointment-actions'>
              {!item.cancelled && item.paymentStatus === 'pending' && !item.isCompleted && (
                <button
                  className='pay-button'
                  onClick={() => setShowPaymentForm(showPaymentForm === item._id ? null : item._id)}
                >
                  Pay Now
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button onClick={() => cancelAppointment(item._id)} className='cancel-button'>
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <button className='cancel'>Appointment Cancelled</button>
              )}

              {item.isCompleted && !item.cancelled && (
                <button className='completed'>Completed</button>
              )}

              {showPaymentForm === item._id && !item.cancelled && !item.isCompleted && (
                <div className='payment-form'>
                  <div className='pay-method-buttons'>
                    <div className='pay-option' onClick={() => handlePaymentClick('bkash', item._id)}>
                      <img src={bkash} alt="bKash" />
                      <span>bKash</span>
                    </div>
                    <div className='pay-option' onClick={() => handlePaymentClick('nagad', item._id)}>
                      <img src={nogod} alt="Nagad" />
                      <span>Nagad</span>
                    </div>
                    <div className='pay-option' onClick={() => handlePaymentClick('rocket', item._id)}>
                      <img src={rocket} alt="Rocket" />
                      <span>Rocket</span>
                    </div>
                    <div className='pay-option' onClick={() => handlePaymentClick('cash', item._id)}>
                      <img src={cash} alt="Cash" />
                      <span>Cash</span>
                    </div>
                  </div>

                  {paymentMethod && paymentMethod !== 'cash' && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter Transaction ID"
                        value={transactionId}
                        onChange={e => setTransactionId(e.target.value)}
                      />
                      <button onClick={() => handleConfirmPayment(item._id)} className='confirm'>
                        Confirm Payment
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappointment;
