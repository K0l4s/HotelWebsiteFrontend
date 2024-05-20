import React from 'react'
import './ServiceBox.css'
import axios from 'axios';
import server from '../../../api/APIPath';
const ServiceBox = (service) => {
    let thumbnail = "https://media.istockphoto.com/id/480125692/photo/sunset-summer-hcm-city.jpg?s=612x612&w=0&k=20&c=5vtajrIKJzZhv1B0aSJW88maZsmYFP0hFd7w4pEocLM="
    // = service.service.thumbnail;
    if(service.service.imageURLs.length > 0){
        thumbnail = service.service.imageURLs[0];
    }
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
            <img src={thumbnail} alt="" />
        </div>
        <div className="ServiceBoxContent">
            <h3>Tên: {service.service.name}</h3>
            <p>Mô tả: {service.service.description}</p>
            <p>Giá: {price} vnđ</p>
        </div>
        <div className="actionGroup">
            {/* <button className='action'>Edit</button> */}
            <button className='action' onClick={deleteService}>Delete</button>
        </div>
    </div>
  )
}

export default ServiceBox