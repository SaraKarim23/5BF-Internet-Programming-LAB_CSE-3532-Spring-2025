import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import './DoctorProfile.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { Authorization: `Bearer ${dToken}` } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="profile-container">
      <img src={profileData.image} alt="Profile" className="profile-image" />

      <div className="profile-details">
        <p className="profile-name">{profileData.name}</p>
        <p className="profile-degree">{profileData.degree} - {profileData.speciality}</p>
        <button className="profile-experience">{profileData.experience}</button>

        <p>About:</p>
        <div className="profile-about">{profileData.about}</div>

        <p className="profile-fee">Appointment fee: <span>৳ {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span></p>

        <div className="profile-address">
          <p>Address:</p>
          <p>{isEdit ? <textarea row={3} onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))} value={profileData.address} /> : profileData.address}</p>
        </div>

        <div className="availability">
          <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" id="availability" />
          <label htmlFor="availability">Available</label>
        </div>
        {
          isEdit
            ? <button onClick={updateProfile} className="edit-button">Save</button>
            : <button onClick={() => setIsEdit(true)} className="edit-button">Edit</button>
        }
      </div>
    </div>
  )
}

export default DoctorProfile
