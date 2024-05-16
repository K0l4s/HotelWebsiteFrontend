import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Homepage from '../pages/homepage/Homepage'
import './Router.css'
import Booking from '../pages/booking/Booking'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import { RiMenuUnfoldLine } from "react-icons/ri";
import { RiMenuFill } from "react-icons/ri";
import Service from '../pages/service/Service'
import Contact from '../pages/contact/Contact'
import ServiceDetail from '../pages/serviceDetail/ServiceDetail'
import MessageBox from '../components/messageBox/MessageBox'
import ConfirmAccount from '../pages/register/confirmAccount/ConfirmAccount'
import Cart from '../pages/cart/Cart'
import AboutUs from '../pages/aboutUs/AboutUs'

const Router = () => {
  const [navIsOpen,setNavIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleOpenNav = () => {
    setNavIsOpen(!navIsOpen);
  }
  return (
    <div  className="router_main">
      
        {navIsOpen ? <Navbar/> : null}
        <button className='btnMenu' onClick={handleOpenNav}>{navIsOpen ? <RiMenuUnfoldLine/>:<RiMenuFill/>}</button>
        <div className='main'>
        <MessageBox/>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/home" element={<Homepage/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/service" element={<Service/>} />
            <Route path='/service/:serviceId' element={<ServiceDetail/>} />
            <Route path="/order" element={<h1>Order của bạn</h1>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/confirm-register/:email" element={<ConfirmAccount/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/*" element={<><h1>404 not found</h1> <p>Tính năng đang được bảo trì hoặc phát triển!</p></>} />
        </Routes>
        <div className="cart" onClick={()=>navigate("HotelWebsiteFrontend/cart")}>
          <img src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG10.png" alt="" />
        </div>
        <div className="returnToTop" onClick={()=>window.scrollTo(0,0)}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Arrow_top.png?20150707132744" alt="" />
        </div>
        </div>
    </div>
  )
}

export default Router