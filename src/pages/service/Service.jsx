import React, { useEffect, useState } from 'react';
import './Service.css';
import ServiceTag from '../../components/serviceTag/ServiceTag';
import APIPath from '../../config/APIPath';

const Service = () => {
    const [service, setService] = useState([]);

    const getService = () => {
        fetch(APIPath + "/service/all")
            .then(response => response.json())
            .then(data => {
                setService(data.body.content);
                console.log(service);
            });
    };

    useEffect(() => {
        getService();
    }, []);

    if (service.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='service'>
            <h1>Biểu giá dịch vụ</h1>
            <div className="searchbox">
                <input type="text" placeholder="Tìm kiếm dịch vụ" />
                <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-zik280t3.png" alt="search_icon" />
            </div>
            <div className="button">
                <button onClick={getService} className='showMore'>Trang trước</button>
                <button className='showMore'>Trang sau</button>
            </div>
            <div className="serviceTagGroup">
                {Array.isArray(service) && service.map((item, index) => (
                    <ServiceTag key={index} service={item} />
                ))}
            </div>
            <div className="button">
                <button className='showMore'>Trang trước</button>
                <button className='showMore'>Trang sau</button>
            </div>
        </div>
    );
};

export default Service;
