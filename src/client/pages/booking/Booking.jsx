import React, { useEffect, useState } from 'react'
import './Booking.css'
import axios from 'axios'
import server from '../../../api/APIPath';
import RoomTag from '../../components/roomTag/RoomTag';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Booking = () => {
  const navigate = useNavigate();
  const toast = useToast();
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
  
  const addItemsToCart = (room) => {
    

  // axios.post(`${server}/api/v1/users/addRoomToCart/${room.id}`,  {
  //     headers: {
  //       'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
  //     }
  // }).then((response) => {
  //     console.log(response);
  //     navigate('/cart');
  // }).catch((error) => {
  //     console.log(error);
  // });
  axios({
    method: 'post',
    url: `${server}/api/v1/users/addRoomToCart/${room.id}`,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  }).then((response) => {
    console.log(response);
    toast({
      title: "Thêm phòng vào giỏ hàng thành công!",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    // navigate('/cart');
  }
  )
  }
  return (
    <div className='booking'>
      <h2>Đặt phòng</h2>
      <p>Danh sách phòng hiện có</p>
      <div className="roomList">
        {rooms.map((room) => (
          <div className='roomItems'>
          <button onClick={()=>addItemsToCart(room)} className='addToCart'>+</button>
          <RoomTag room={room} id={room.id} key={room.id} />
          </div>
        ))}
        </div>
    </div>
  )
}

export default Booking