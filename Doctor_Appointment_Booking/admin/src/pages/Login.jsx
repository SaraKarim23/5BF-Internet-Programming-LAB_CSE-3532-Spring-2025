import React, { useContext, useState } from 'react'
import './Login.css'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)

                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    console.log(token);
                    

                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {

        }
    }
    return (
        <form onSubmit={onSubmitHandler} className='adminpanel'>
            <div className='panel-container'>
                <h1><span>{state}</span> Login</h1>
                <div>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' required />
                </div>
                <div>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' required />
                </div>
                <button>Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='state' onClick={() => setState('Doctor')}>Click Here</span></p>
                        : <p>Admin Login? <span className='state' onClick={() => setState('Admin')}>Click Here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
