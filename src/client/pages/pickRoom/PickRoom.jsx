import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PickRoom.css';
import axios from 'axios';
import server from '../../../api/APIPath';
import { Input } from '@chakra-ui/react';

const PickRoom = () => {
    const [roomList, setRoomList] = useState([]);
    const [branchAvailable, setBranchAvailable] = useState([]);
    const [serviceList, setServiceList] = useState([]); // [id, name, price, description, image]
    const [choosenService, setChoosenService] = useState([]); // [id, name, price, description, image, amount
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const roomid = useParams().roomid;
    const [roomType, setRoomType] = useState({});
    const [price, setPrice] = useState(0);
    useEffect(() => {
        fetchRoomType();
        fetchBranches();
        fetchService();
        setDefaultDates();
    }, []);

    const setDefaultDates = () => {
        const now = new Date();
        const checkInDate = now.toISOString().slice(0, 16); // current date and time in ISO format
        const checkOutDate = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16); // one hour later

        setCheckIn(checkInDate);
        setCheckOut(checkOutDate);
    };

    const fetchBranches = async () => {
        try {
            const response = await axios.get(`${server}/api/v1/branch/findByRoomType/${roomid}`);
            // console.log(response.data);
            setBranchAvailable(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRooms = async (branchid) => {
        try {
            console.log(branchid)
            const response = await axios.get(server + `/api/v1/room/available?checkIn=${checkIn}&checkOut=${checkOut}&branchId=${branchid}&roomTypeId=${roomid}`);
            // console.log(response.data);
            setRoomList(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchRoomType = async () => {
        try {
            const response = await axios.get(server + `/api/v1/room-type/${roomid}`);
            setRoomType(response.data);
            setPrice(response.data.priceEachRoom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // format price
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchService = async () => {
        try {
            const response = await axios.get(server + `/api/v1/service/all?pageNo=0&pageSize=5&sortBy=id&sortDir=asc`);
            setServiceList(response.data.body.content);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const addServiceToChoose = (service) => {
        setChoosenService([...choosenService, service]);
    }
    return (
        <div>
            <div className="roomInfo">
                <h1>Phòng bạn đang chọn</h1>
                <div className="roomContent">
                    <p>Room id: {roomid}</p>
                    <p>Loại phòng: {roomType.name}</p>
                    <p>Giá thuê: {price}vnđ/giờ</p>
                    <p>Room acreare: {roomType.acreage} m²</p>
                </div>
                <div className='chooseRoom'>
                    <h1>Chọn chi nhánh</h1>
                    <select id='branch' onChange={(e) => fetchRooms(e.target.value)}>
                        {branchAvailable.map((branch) => (
                            <option key={branch.id} value={branch.id}>{branch.location}</option>
                        ))}
                    </select>
                    <h1>Chọn Phòng</h1>
                    <select>
                        {roomList.map((item) => (
                            <option key={item.id} value={item.id}>{item.number}</option>
                        ))}
                    </select>
                </div>
                <div className="chooseRoom">
                    <h1>CheckIn</h1>
                    <Input
                        id='checkIn'
                        value={checkIn}
                        onChange={(e) => { setCheckIn(e.target.value); fetchRooms(document.getElementById('branch').value) }}
                        backgroundColor={'grey'}
                        placeholder='Select Date and Time'
                        size='md'
                        type='datetime-local'
                    />
                    <h1>Checkout</h1>
                    <Input
                        id='checkOut'
                        value={checkOut}
                        onChange={(e) => { setCheckOut(e.target.value); fetchRooms(document.getElementById('branch').value) }}
                        backgroundColor={'grey'}
                        placeholder='Select Date and Time'
                        size='md'
                        type='datetime-local'
                    />
                </div>
            </div>

            <div className="mainItems">
                <div className="service">
                    <h1>Các dịch vụ chọn kèm</h1>
                    <div className="chooseService">
                        <h1>Chọn thêm dịch vụ</h1>
                        {choosenService.map((service) => (
                            <div className="serviceItem" key={service.id}>
                                <div className="serviceItem__img">
                                    <img src={service.image} alt="" />
                                </div>
                                <div className="serviceItem__info">
                                    <div className="serviceContent">
                                        <p>Dịch vụ: {service.name}</p>
                                        <p>Giá: {service.price}</p>
                                        <p>Mô tả: {service.description}</p>
                                        <div className="amount">
                                            <button>+</button>
                                            <input type="number" value={service.amount} />
                                            <button>-</button>
                                        </div>
                                    </div>
                                    <button>Xóa</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="chooseService">
                        <h1>Chọn thêm dịch vụ</h1>
                        {serviceList.map((service) => (
                            <div className="serviceItem" key={service.id}>
                                <div className="serviceItem__img">
                                    <img src={service.image} alt="" />
                                </div>
                                <div className="serviceItem__info">
                                    <div className="serviceContent">
                                        <p>Dịch vụ: {service.name}</p>
                                        <p>Giá: {service.price}</p>
                                        <p>Mô tả: {service.description}</p>
                                    </div>
                                    <button onClick={()=>addServiceToChoose(service)}>Thêm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="paymentMethod">
                    <h1>Chọn phương thức thanh toán</h1>
                    <div className="paymentItem">
                        <p>Tổng số tiền giao dịch: 500.000</p>
                        <input type="radio" name="payment" id="cash" value="cash" />
                        <label htmlFor="cash">Thanh toán tiền mặt</label>
                    </div>
                    <div className="paymentItem">
                        <input type="radio" name="payment" id="card" value="card" />
                        <label htmlFor="card">Thanh toán qua thẻ</label>
                    </div>
                    <button>Thanh toán</button>
                </div>
            </div>
        </div>
    );
};

export default PickRoom;
