
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { GoHome } from "react-icons/go";
import { RiHotelLine } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdRoomService } from "react-icons/md";
import { MdPermDeviceInformation } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const username = localStorage.getItem('access_token');
  const signOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  }
  console.log(path);
  return (
    <div className='navbar'>
      <img className='logo' src="https://www.freepnglogos.com/uploads/hotel-logo-png/download-building-hotel-clipart-png-33.png" alt="logo" />
      <div className="buttonGroup">
        <button className={path === '/' ? 'active' : ''} onClick={() => navigate('/')}><GoHome /> Trang chủ</button>
        <button className={path === '/booking' ? 'active' : ''} onClick={() => navigate('/booking')}> <RiHotelLine /> Đặt phòng</button>
        <button className={path === '/service' ? 'active' : ''} onClick={() => navigate('/service')}> <MdRoomService /> Dịch vụ</button>
        <button className={path === '/about' ? 'active' : ''} onClick={() => navigate('/about')}> <MdPermDeviceInformation /> Về chúng tôi</button>
        <button className={path === '/contact' ? 'active' : ''} onClick={() => navigate('/contact')}> <RiCustomerService2Fill /> Liên hệ</button>
        {username ?
          <>
            {/* <button className={path === '/profile' ? 'active' : ''} onClick={() => navigate('/profile')}> <TbLogin2 /> {'Xin chào, Trung Kiên'} </button> */}
            {/* <button className={path === '/order' ? 'active' : ''} onClick={() => navigate('/order')}><IoCreateOutline /> Order của bạn</button> */}
           
            <button className={path === '/cart' ? 'active' : ''} onClick={() => navigate('/cart')}><IoCreateOutline /> Giỏ hàng</button>
            <button onClick={()=>navigate("/admin")}>ADMIN</button>
            <button className={path === '/logout' ? 'active' : ''} onClick={signOut}><IoCreateOutline /> Đăng xuất</button>
          </>
           : 
          <>
            <button className={path === '/login' ? 'active' : ''} onClick={() => navigate('/login')}> <TbLogin2 /> Đăng nhập</button>
            <button className={path === '/register' ? 'active' : ''} onClick={() => navigate('/register')}><IoCreateOutline /> Đăng ký</button>
          </>
         } 
      </div>
    </div>
  )
}

export default Navbar;