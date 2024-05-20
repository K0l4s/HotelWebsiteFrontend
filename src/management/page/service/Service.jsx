import React, { useEffect, useState } from 'react'
import './Service.css'
import ServiceBox from '../../components/serviceBox/ServiceBox'
import apiService from '../../../api/apiService'
import { useToast } from '@chakra-ui/react'
import AddServiceModal from '../../components/modal/addService/AddServiceModal'
const Service = () => {
    const toast = new useToast();
    const [serviceList, setServiceList] = useState([]) 
    useEffect(() => {
        getServiceData();
    }, [])
    const getServiceData = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const header = {
            'Authorization': 'Bearer ' + token
        }

        try {
            const data = await apiService.get("/api/v1/management/service/all?showDisabled=false&showAll=false", header);
            console.log(data);

            if (data.status) {
                setServiceList(data.body);
                console.log(serviceList);
            } else {
                toast({
                    title: "Không có dữ liệu service",
                    description: "Vui lòng thử lại sau",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right"
                });
            }
        } catch (error) {
            toast({
                title: "Lỗi khi lấy dữ liệu service",
                description: "Vui lòng thử lại sau",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
        }
    }

const [isOpenAddService, setIsOpenAddService] = useState(false)
const onCloseAddService = () => {
    setIsOpenAddService(false);
    getServiceData();
}
return (
    <div className='servicePage'>
        <h1>Quản lý dịch vụ</h1>
        {/* <div className="search">
            <input type="text" placeholder="Tìm kiếm dịch vụ..." />
            <button>Search</button>
        </div> */}
        <button className="add" onClick={() => setIsOpenAddService(true)}>Thêm dịch vụ mới</button>
        <div className="serviceList">
            {serviceList.length == 0 ? (<h1>Không lấy được dữ liệu, hãy thử tạo một trường dữ liệu mới!</h1>) :
                (serviceList.map((service) => (
                    <ServiceBox key={service.id} service={service} />
                )))}
        </div>
        <AddServiceModal isOpen={isOpenAddService} onClose={onCloseAddService} />
    </div>
)
}

export default Service