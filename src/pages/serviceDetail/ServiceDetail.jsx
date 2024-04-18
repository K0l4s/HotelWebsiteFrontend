import React, { useEffect, useState } from 'react'
import './ServiceDetail.css'
import { useParams } from 'react-router-dom';
import APIPath from '../../config/APIPath'
const ServiceDetail = () => {
    // Lấy id từ url
    const {serviceId} = useParams();
    // console.log(serviceId);
    const [serviceData,setServiceData] = useState({});
    const fetchService = async () => {
        try {
            const response = await fetch(APIPath+`/api/service/${serviceId}`);
            const data = await response.json();
            setServiceData(data.body);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getData = useEffect(() => {
        fetchService();
    },[])
    const salePrice = serviceData.price - (serviceData.price * serviceData.salePercent / 100);
    if(serviceData===null){
        return (
            <div>
                <h1>ServiceDetail</h1>
                <h1>Không tìm thấy dịch vụ</h1>
            </div>
        )
    } 
    return (
        <div>
            <h1>Thông tin chi tiết dịch vụ</h1>
            <h1>Tên gọi dịch vụ: {serviceData.name}</h1>
            <p>Mô tả dịch vụ: {serviceData.description}</p>
            <p>Giá gốc: {serviceData.price} vnđ</p>
            {serviceData.salePercent > 0 ? <p>GIẢM {serviceData.salePercent}% CHỈ CÒN {salePrice} vnđ</p> : null}
            {serviceData.image === null ? <p>Không có hình ảnh để hiển thị</p> : 
            <img src={serviceData.image} alt={serviceData.name}/>}
        </div>
    )
}

export default ServiceDetail