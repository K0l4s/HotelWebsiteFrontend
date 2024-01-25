import React, { useState } from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="logo" />
      <div className="buttonGroup">
      <button>Trang chủ</button>
      <button>Đặt phòng</button>
      <button>Biểu giá dịch vụ</button>
      <button>Về chúng tôi</button>
      <button>Liên hệ</button>
      </div>
      <div className="searchbox">
        <input type="text" placeholder="Tìm kiếm" />
        <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-zik280t3.png" alt="search_icon" />
      </div>
    </div>
  )
}

export default Navbar