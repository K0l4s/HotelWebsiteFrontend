import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Homepage from '../pages/homepage/Homepage'
import './Router.css'
import Booking from '../pages/booking/Booking'
const Router = () => {
  return (
    <div>
        <Navbar />
        <div className="router_main">
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/*" element={<h1>404 not found</h1>} />
        </Routes>
        </div>
    </div>
  )
}

export default Router