import React from 'react'
import './RoomTag.css'
import { useNavigate } from 'react-router-dom';
const RoomTag = (room) => {
    const navigate = useNavigate();
    const formatPrice = room.room.priceEachRoom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <div>
            <div className="room">
                <img src="https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg" alt="room" />
                <p>{room.room.name}</p>
                <p>Giá: {formatPrice} / giờ</p>
                <div className="actionGroup">
                    <button onClick={()=>navigate(`/room/${room.id}`)}>Chi tiết</button>
                    <button>Chọn phòng</button>
                </div>
            </div>
        </div>
    )
}

export default RoomTag