import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import RoomTag from '../../components/roomTag/RoomTag';
import server from '../../../api/APIPath';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const toast = useToast();
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

  const removeFromCart = async (id) => {
    // axios.post(server + `/api/v1/users/removeRoomFromCart/${id}`, {
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    //   }
    // }).then((response) => {
    //   console.log(response);
    //   fetchCartItems();
    // }
    // )
    axios({
      method: 'post',
      url: server + `/api/v1/users/removeRoomFromCart/${id}`,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then((response) => {
      console.log(response);
      fetchCartItems();
      toast({
        title: "Xóa phòng khỏi giỏ hàng thành công!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
    )
  }
  return (
    <div className='carts'>
      <h2>Giỏ hàng của bạn</h2>
      <button onClick={()=>navigate("/booking")}>Đặt phòng ngay</button>
      <div className="cartItems">
      {cartItems.map((item) => (
        <div className='items'>
        <button onClick={()=>removeFromCart(item.id)} className='deleteButton'>X</button>
        <RoomTag room={item} id={item.id} key={item.id} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Cart;
