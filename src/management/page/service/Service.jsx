import React, { useEffect, useState } from 'react'
import './Service.css'
import ServiceBox from '../../components/serviceBox/ServiceBox'
import server from '../../config/APIPath'
import AddServiceModal from '../../components/modal/addService/AddServiceModal'
import APIInformation from '../../config/APIInformation'
const Service = () => {
    const [serviceList, setServiceList] = useState([])

    useEffect(() => {
        getServiceData();
    }
    , [])
    const getServiceData = async () => {
        try {
            const url = server + "/admin/service/all?showDisabled=false&showAll=true";
            console.log(url);
            // const respone = await fetch(url);
            const respone = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // Xác thực username password
                    'Authorization': 'Basic ' + btoa(APIInformation.username + ":" + APIInformation.password)
                }
            });
            const data = await respone.json();
            setServiceList(data.body);
            console.log(serviceList);
        }
        catch (err) {
            console.log(err);

        }
    }
    const [isOpenAddService, setIsOpenAddService] = useState(false)
    const onCloseAddService = () => {setIsOpenAddService(false);
    getServiceData();}
  return (
    <div>
        <h1>Quản lý dịch vụ</h1>
        <div className="search">
            <input type="text" placeholder="Tìm kiếm dịch vụ..." />
            <button>Search</button>
        </div>
        <button className="add" onClick={()=>setIsOpenAddService(true)}>Thêm dịch vụ mới</button>
        <div className="serviceList">
            {serviceList.length == 0 ? (<h1>Không lấy được dữ liệu, hãy thử tạo một trường dữ liệu mới!</h1>) :
            (serviceList.map((service) => (
                <ServiceBox key={service.id} service={service} />
            )))}
        </div>
        <AddServiceModal isOpen={isOpenAddService} onClose={onCloseAddService}/>
    </div>
  )
}

export default Service