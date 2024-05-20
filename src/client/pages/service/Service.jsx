import React, { useEffect, useState } from 'react';
import './Service.css';
import ServiceTag from '../../components/serviceTag/ServiceTag';
import APIPath from '../../../api/APIPath';
import apiService from '../../../api/apiService';
import { useToast } from '@chakra-ui/react';

const Service = () => {
    const [service, setService] = useState([]);
    const toast = useToast();

    const getService = () => {
        apiService.get("/api/v1/service/all")
            // .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.status){
                setService(data.body.content);
                console.log(service);
                    // console.log(status);
                    return;
                }else{
                    // data = data.data;
                    toast({
                        title: "Không có dữ liệu service",
                        description: "Vui lòng thử lại sau",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right"
                    });
                }
                
            }).catch(err => {
                console.log(err);
                toast({
                    title: "Lỗi khi lấy dữ liệu service",
                    description: "Vui lòng thử lại sau",
                    status: "error",
                    duration: 5000, 
                    isClosable: true,
                    position: "bottom-right"
                });
            })
    };

    useEffect(() => {
        getService();
    }, []);

    if (service.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='service'>
            <h2>Biểu giá dịch vụ</h2>
            {/* <div className="searchbox">
                <input type="text" placeholder="Tìm kiếm dịch vụ" />
                <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-zik280t3.png" alt="search_icon" />
            </div> */}
            {/* <div className="button">
                <button onClick={getService} className='showMore'>Trang trước</button>
                <button className='showMore'>Trang sau</button>
            </div> */}
            <div className="serviceTagGroup">
                {Array.isArray(service) && service.map((item, index) => (
                    <ServiceTag key={index} service={item} />
                ))}
            </div>
            {/* <div className="button"> */}
                {/* <button className='showMore'>Trang trước</button> */}
                {/* <button className='showMore'>Trang sau</button> */}
            {/* </div> */}
        </div>
    );
};

export default Service;
