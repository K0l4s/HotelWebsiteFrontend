import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('orders')) || []);

  const deleteItem = (serviceId) => () => {
    const updatedOrders = orders.filter((order) => order.serviceId !== serviceId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const updateQuantity = (serviceId, newQuantity) => () => {
    if(newQuantity <= 0) return deleteItem(serviceId)();
    const updatedOrders = orders.map((order) =>
      order.serviceId === serviceId ? { ...order, quantity: newQuantity } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div>
      <h1>Giỏ hàng của bạn</h1>
      <button>Đặt phòng ngay</button>
      <div className="cartItems">
        {orders.length !== 0 ? (
          orders.map((order, index) => (
            <div key={index} className="cartItem">
              
              <input type="checkbox" id="check"/>
              <label for='check'>Chọn dịch vụ</label>
              <h2>{order.serviceName}</h2>
              <p>Giá: {order.price}</p>
              <p>Giá khuyến mãi: {order.salePrice}</p>
              <p>
                Số lượng:{' '}
                <button onClick={updateQuantity(order.serviceId, order.quantity - 1)}>-</button>{' '}
                {order.quantity}
                <button onClick={updateQuantity(order.serviceId, order.quantity + 1)}>+</button>{' '}
              </p>
              <button onClick={deleteItem(order.serviceId)} className="deleteItem">
                Del
              </button>
            </div>
          ))
        ) : (
          <h1>Chưa có sản phẩm nào trong giỏ hàng</h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
