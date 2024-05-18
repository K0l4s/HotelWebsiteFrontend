import React from 'react'
import './ServiceBox.css'
import axios from 'axios';
import server from '../../../api/APIPath';
const ServiceBox = (service) => {
    console.log(service);
    // Chuẩn hoá price thành dạng .000.000
    const price = service.service.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const deleteService = async() => {
        axios.delete(server+'/api/v1/management/service/'+service.service.id,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } }
        ).then((response) => {
            console.log(response.data);
            window.location.reload();
        }
        ).catch((error) => {
            console.log(error);
        }
        );
        // return window.location.reload();
    }

  return (
    <div className='serviceBox'>
        <div className="serviceBoxRight">
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="" />
        </div>
        <div className="ServiceBoxContent">
            <h3>Tên: {service.service.name}</h3>
            <p>Mô tả: {service.service.description}</p>
            <p>Giá: {price} vnđ</p>
        </div>
        <div className="actionGroup">
            <button className='action'>Edit</button>
            <button className='action' onClick={deleteService}>Delete</button>
        </div>
    </div>
  )
}

export default ServiceBox