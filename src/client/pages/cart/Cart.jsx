import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import RoomTag from '../../components/roomTag/RoomTag';
import server from '../../../api/APIPath';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);
  const fetchCartItems = async () => {


    axios.get(server + "/api/v1/cart/all",
      { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
      .then((response) => {
        console.log(response.data);
        setCartItems(response.data);
      }).catch((error) => {
        console.log(error);
      });
  };
  // const response = await axios.get(server + "/api/v1/cart/all");
  // console.log(response.data);
  // setCartItems(response.data);


  return (
    <div>
      <h1>Giỏ hàng của bạn</h1>
      <button>Đặt phòng ngay</button>
      <div className="cartItems">
      {cartItems.map((item) => (
        <div className='items'>
        <button className='deleteButton'>X</button>
        <RoomTag room={item} id={item.id} key={item.id} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Cart;
