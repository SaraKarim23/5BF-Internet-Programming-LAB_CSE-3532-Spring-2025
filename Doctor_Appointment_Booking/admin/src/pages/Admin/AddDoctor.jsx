import React, { useContext, useState } from 'react';
import docProfile from '../../assets/docProfile.png'
import './AddDoctor.css'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address, setAddress] = useState('')
  const { backendUrl, aToken } = useContext(AdminContext)
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', address)
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);

      })
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAbout('')
        setDegree('')
        setAddress('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='add-doctor-container'>
      <p className='title'>Add Doctor</p>
      <div className="add-doctor-form">

        <div className="add-doctor-img">
          <label htmlFor='doc-img'>
            <img src={docImg ? URL.createObjectURL(docImg) : docProfile} alt='Doctor' />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className="add-doctor-form-row">
          <div className="add-doctor-form-column">
            <div className="add-doctor-form-group">
              <p>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' required />
            </div>
            <div className="add-doctor-form-group">
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required />
            </div>
            <div className="add-doctor-form-group">
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
            </div>
            <div className="add-doctor-form-group">
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience}>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="add-doctor-form-group">
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='Fees' required />
            </div>
          </div>

          <div className="add-doctor-form-column">
            <div className="add-doctor-form-group">
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="add-doctor-form-group">
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='Education' required />
            </div>
            <div className="add-doctor-form-group">
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Address' required />
            </div>
          </div>
        </div>

        <div className="add-doctor-form-group">
          <p>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder='Write about doctor' rows={4} required />
        </div>

        <button type='submit'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
