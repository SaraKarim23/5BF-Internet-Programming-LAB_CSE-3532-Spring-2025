import React, { useContext, useState } from 'react'
import './Myprofile.css'
import { AppContext } from '../context/AppContext';
import upload from '../assets/upload_icon.png'
import { toast } from 'react-toastify';
import axios from 'axios';

const Myprofile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', userData.address)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='pro-container'>
      {
        isEdit ? (
          <label htmlFor="image" className="pro-image-upload">
            <img src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img src={image ? '' : upload} alt="Upload Icon" />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img src={userData.image} alt="Profile" className="pro-img" />
        )
      }

      {
        isEdit ?
          <input type="text" className='nameinput' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='name1'>{userData.name}</p>
      }
      <hr className='hr' />
      <div className='con-section'>
        <p className='con-info'>CONTACT INFORMATION</p>
        <div className='all'>
          <p >Email ID : </p>
          <p style={{ color: "#0056b3" }}>{userData.email}</p>
          <p>Phone : </p>
          {
            isEdit ?
              <input type="text" className='nameinput' value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p style={{ color: "#0056b3" }}>{userData.phone}</p>
          }
          <p>Address : </p>
          {
            isEdit ?
              <p>

                <textarea
                  className='add'
                  rows={3}
                  value={userData.address}
                  onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                />

              </p>
              : <p>{userData.address}</p>
          }
        </div>
      </div>
      <div className="basic-info">
        <p className='basic'>BASIC INFORMATION</p>
        <div className='all'>
          <p>Gender : </p>
          {isEdit ? (
            <select onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
          <p>Birthday : </p>
          {isEdit ? (
            <input type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div>
        {
          isEdit ?
            <button className='my-profile' onClick={updateUserProfileData}>Save Information</button>
            : <button className='my-profile' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Myprofile
