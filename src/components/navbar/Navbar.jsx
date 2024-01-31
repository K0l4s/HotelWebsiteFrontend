import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { GoHome } from "react-icons/go";
import { RiHotelLine } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdRoomService } from "react-icons/md";
import { MdPermDeviceInformation } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="logo" />
      <div className="buttonGroup">
      <button onClick={()=>navigate('/')}><GoHome/> Trang chủ</button>
      <button onClick={()=>navigate('booking')}> <RiHotelLine/> Đặt phòng</button>
      <button onClick={()=>navigate('service')}> <MdRoomService/> Dịch vụ</button>
      <button onClick={()=>navigate('about')}> <MdPermDeviceInformation/> Về chúng tôi</button>
      <button onClick={()=>navigate('contact')}> <RiCustomerService2Fill/> Liên hệ</button>
      </div>
      <div className="searchbox">
        <input type="text" placeholder="Tìm kiếm" />
        <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-zik280t3.png" alt="search_icon" />
      </div>
    </div>
  )
}

export default Navbar