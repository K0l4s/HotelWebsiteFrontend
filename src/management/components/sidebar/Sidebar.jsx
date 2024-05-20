import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <div className='side'>
            <div className="buttonGroup">
                {/* <button>Dashboard</button> */}
                {/* <button onClick={()=>navigate("/admin/booking")}>Booking</button> */}
                {/* <button onClick={()=>navigate("/admin/user")}>User</button> */}
                <button onClick={()=>navigate("/admin/room")}>Room</button>
                {/* <button onClick={()=>navigate("/admin/payment")}>Payment</button> */}
                <button onClick={()=>navigate("/admin/service")}>Service</button>
                {/* <button onClick={()=>navigate("/admin/history")}>History</button> */}
                <button onClick={()=>navigate("/admin/branch")}>Branch</button>
            </div>
        </div>
    )
}

export default Sidebar