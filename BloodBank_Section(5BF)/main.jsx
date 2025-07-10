import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthProvider from './Providers/AuthProvider'
import "aos/dist/aos.css"; 
import AOS from "aos";
import {  HelmetProvider } from 'react-helmet-async'



AOS.init();






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     
     <AuthProvider>

      <HelmetProvider>
      <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>

   </AuthProvider>
     
  </React.StrictMode>,
)
