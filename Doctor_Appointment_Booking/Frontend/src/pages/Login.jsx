import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const onsubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onsubmitHandler}>
      <div className="login">
        <div className="login-page">
          <h1>{state === 'Sign up' ? "Create Account" : "Login"}</h1>
          <p>Please {state === 'Sign up' ? "sign up" : "log in"} to book appointment</p>

          {state === 'Sign up' && (
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Full Name"
              required
            />
          )}

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />
          <button type="submit" className="button">
            {state === 'Sign up' ? "Create Account" : "Login"}
          </button>

          {state === 'Sign up' ? (
            <>
              <p>
                Already have an account?
                <span className="create-account-text" onClick={() => setState('Login')}>
                  Login Here
                </span>
                <span className='right-admin'>
                  Are you Admin?
                  <a href="http://localhost:5174/login" target="_blank" rel="noreferrer" className="admin-click">
                    Click Here
                  </a>
                </span>
              </p>
            </>
          ) : (
            <p>
              Haven't created an account?{' '}
              <span className="create-account-text" onClick={() => setState('Sign up')}>
                Click Here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login;
