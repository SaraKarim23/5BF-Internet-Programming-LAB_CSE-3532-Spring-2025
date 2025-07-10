import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './Appointment.css'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'


const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = () => {
    const foundDoctor = doctors.find(doc => doc._id === docId)
    setDocInfo(foundDoctor || null)
  }

  const getAvailableSlots = () => {
    if (!docInfo) return

    const today = new Date()
    const newSlots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10))
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailble = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailble) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      newSlots.push(timeSlots)
    }
    setDocSlots(newSlots)
    setSlotIndex(0)
    setSlotTime('')
  }

  const BookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      navigate('/login')
      return
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div>
      <div className="appointment-container">
        <div className="appointment-card">
          <img src={docInfo.image} alt='' className="appointment-img" />
          <div className="appointment-info">
            <p className="doctor-name">
              {docInfo.name} <i className="fa fa-check-circle"></i>
            </p>
            <div className="doctor-meta">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="experience-btn">{docInfo.experience}</button>
            </div>
            <div className="doctor-about">
              <p className="about-title">About <i className="fa fa-info-circle"></i></p>
              <p className="about-text">{docInfo.about}</p>
            </div>
            <p className='fee'>
              Appointment fee: <span>{docInfo.fees} {currencySymbol}</span>
            </p>
          </div>
        </div>
      </div>

      <div className='booking'>
        <p className='slot'>Booking Slots</p>
        <div className='booking-slots-wrapper'>
          {docSlots.map((item, index) => (
            item.length > 0 && (
              <div
                key={index}
                className={`booking-slot ${index === slotIndex ? 'active' : ''}`}
                onClick={() => setSlotIndex(index)}
              >
                <p>{daysofWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0].datetime.getDate()}</p>
              </div>
            )
          ))}
        </div>

        <div className='booking-time'>
          {docSlots[slotIndex] && docSlots[slotIndex].map((slot, index) => (
            <p
              key={index}
              className={`time ${slot.time === slotTime ? 'active' : ''}`}
              onClick={() => setSlotTime(slot.time)}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button onClick={BookAppointment} className='book'>Book An Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
