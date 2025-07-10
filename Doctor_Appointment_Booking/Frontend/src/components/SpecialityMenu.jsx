import React from 'react'
import { specialitydata } from '../assets/assets'
import { Link } from 'react-router-dom'
import './SpecialityMenu.css'
const SpecialityMenu = () => {
  return (
    <div id='speciality'>
      <h1>Find By Speciality</h1>
      <p>Explore a wide range of medical specialties and find the right doctor for your needs — all in one place.</p>
      <div>
        {specialitydata.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} key={index} to={`/alldoctor/${item.speciality}`}>
                <img src={item.image} alt=""/>
                <p>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
