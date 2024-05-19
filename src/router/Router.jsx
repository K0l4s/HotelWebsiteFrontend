import React, { useState } from 'react'
import { RiMenuFill, RiMenuUnfoldLine } from 'react-icons/ri';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../client/components/navbar/Navbar';
import Login from '../client/pages/login/Login';
import Register from '../client/pages/register/Register';
import Service from '../client/pages/service/Service';
import AboutUs from '../client/pages/aboutUs/AboutUs';
import ConfirmAccount from '../client/pages/register/confirmAccount/ConfirmAccount';
import Homepage from '../client/pages/homepage/Homepage';
import Booking from '../client/pages/booking/Booking';
import Contact from '../client/pages/contact/Contact';
import ServiceDetail from '../client/pages/serviceDetail/ServiceDetail';
import Cart from '../client/pages/cart/Cart';
import MessageBox from '../client/components/messageBox/MessageBox';
import './Router.css';
import Sidebar from '../management/components/sidebar/Sidebar';
import Branch from '../management/page/branch/Branch';
import ServiceAdmin from '../management/page/service/Service';
import Room from '../management/page/room/Room';
import RoomDetail from '../management/page/room/detailRoom/DetailRoom';
import RoomDetailClient from '../client/pages/RoomDetailClient/RoomDetailClient';
import PickRoom from '../client/pages/pickRoom/PickRoom';
const Router = () => {
  const [navIsOpen, setNavIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleOpenNav = () => {
    setNavIsOpen(!navIsOpen);
  }
  if (window.location.pathname.includes("/admin"))
    return (
      <div className="admin_router">
        <Sidebar />
        <div className="admin">
          <Routes>
            <Route path="/admin" element={<p>Hello</p>} />
            <Route path="/admin/branch" element={<Branch />} />
            <Route path="/admin/dashboard" element={null} />
            <Route path="/admin/service" element={<ServiceAdmin />} />
            <Route path="/admin/booking" element={null} />
            <Route path="/admin/room" element={<Room/>} />
            <Route path="/admin/room/:id" element={<RoomDetail/>} />
          </Routes>
          <div onClick={() => window.scrollTo(0, 0)} className="returnToTop">
          </div>
        </div>
      </div>
    )

  return (
    <div className="router_main">

      {navIsOpen ? <Navbar /> : null}
      <button className='btnMenu' onClick={handleOpenNav}>{navIsOpen ? <RiMenuUnfoldLine /> : <RiMenuFill />}</button>
      <div>
        <MessageBox />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/picking/:roomid" element={<PickRoom />} />
          <Route path='/room/:id' element={<RoomDetailClient />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service" element={<Service />} />
          <Route path='/service/:serviceId' element={<ServiceDetail />} />
          <Route path="/order" element={<h1>Order của bạn</h1>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confirm-register/:email" element={<ConfirmAccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<><h1>404 not found</h1> <p>Tính năng đang được bảo trì hoặc phát triển!</p></>} />
        </Routes>
        <div className="cart" onClick={() => navigate("/cart")}>
          <img src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG10.png" alt="" />
        </div>
        <div className="returnToTop" onClick={() => window.scrollTo(0, 0)}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Arrow_top.png?20150707132744" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Router