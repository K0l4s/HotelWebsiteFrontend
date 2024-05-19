import React, { useEffect, useState } from 'react'
import './Booking.css'
import axios from 'axios'
import server from '../../../api/APIPath';
import RoomTag from '../../components/roomTag/RoomTag';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const [rooms, getRooms] = useState([])
  useEffect(() => {
    fetchRooms();
  }, [])
  const fetchRooms = async() => {
    axios.get(server+"/api/v1/room-type/all")
    .then((response) => {
      console.log(response)
      getRooms(response.data)
    })
    // console.log(data)
  }

  return (
    <div className='booking'>
      <h1>Đặt phòng</h1>
      <p>Danh sách phòng hiện có</p>
      <div className="roomList">
        {rooms.map((room) => (
          <RoomTag room={room} id={room.id} key={room.id} />
        ))}
        </div>
    </div>
  )
}

export default Booking