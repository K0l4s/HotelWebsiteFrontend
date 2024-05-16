import React from 'react'
import './ServiceBox.css'
const ServiceBox = (service) => {
    // description
    // id
    // image
    // name
    // price
    // salePercent
    console.log(service);
    // Chuẩn hoá price thành dạng .000.000
    const price = service.service.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const salePrice = service.service.price - service.service.price*service.service.salePercent/100;
    const salePriceFormat = salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div className='serviceBox'>
        <div className="serviceBoxRight">
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="" />
        </div>
        <div className="ServiceBoxContent">
            <h3>Tên: {service.service.name}</h3>
            <p>Mô tả: {service.service.description}</p>
            <p>Giá: {price} vnđ</p>
            <p>Giảm giá: {service.service.salePercent} %</p>
            <p>Giá sau giảm: {salePriceFormat} vnđ</p>
        </div>
        <div className="actionGroup">
            <button className='action'>Edit</button>
            <button className='action'>Delete</button>
        </div>
    </div>
  )
}

export default ServiceBox