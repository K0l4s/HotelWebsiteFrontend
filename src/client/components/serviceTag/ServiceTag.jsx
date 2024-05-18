import React from 'react'
import './ServiceTag.css'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ServiceTag = (service) => {
 
  var price = 0;
  if(service.service.price % 1 === 0){
    price = service.service.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  

  const handleDetail = () => {
    navigate("/service/"+service.service.id);
  }
  // console.log(id);
  const navigate=useNavigate();
  const addOrder= () => {
    const order = {
      "serviceId": service.service.id,
      "serviceName": service.service.name,
      "price": service.service.price,
      "quantity": 1
    }
    console.log("order", order)
    let orders = JSON.parse(localStorage.getItem("orders"));
    // Tìm xem có serviceId tồn tại trong cookie chưa
    if(orders !== null){
      for(let i = 0; i < orders.length; i++){
        if(orders[i].serviceId === order.serviceId){
          orders[i].quantity += 1;
          localStorage.setItem("orders", JSON.stringify(orders));
          return;
        }
      }
    }
    if(orders === null){
      orders = [];
    }
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  }
  

  return (
    <div className='serviceTag'>
      <div className="serviceTagTitle">
        <h2>{service.service.name!=null?service.service.name:'[Sản phẩm chưa đặt tên]'}</h2>
      </div>
      {/* <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" alt="serviceImage" className='sImage' /> */}
      <div className="sContent">
        <p className='sDecripstion'>{service.service.description!=null? service.service.description : '[Không có mô tả]'}</p>
        <div className="sRight">
          <div className="price">Giá: {price}</div>
          
        </div>
        </div>
      {/* <button className='detailBtn' onClick={handleDetail}>Chi tiết dịch vụ</button> */}
      <div className="addOrder" onClick={addOrder}><IoMdAddCircleOutline size={50} color='green'/></div>
      <div className="backGroundImage">
        <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" alt="serviceImage" className='sImage' />
      </div>
    </div>
  ) 
}

export default ServiceTag