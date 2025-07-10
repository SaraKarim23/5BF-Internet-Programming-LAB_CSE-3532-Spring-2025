import React from 'react'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Alldoctor from './pages/Alldoctor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/myprofile'
import Myappointment from './pages/Myappointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import 'boxicons/css/boxicons.min.css'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alldoctor' element={<Alldoctor />} />
        <Route path='/alldoctor/:speciality' element={<Alldoctor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<Myprofile />} />
        <Route path='/my-appointments' element={<Myappointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
