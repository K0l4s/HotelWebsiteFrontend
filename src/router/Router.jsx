import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const Router = () => {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={null} />
        </Routes>
    </div>
  )
}

export default Router