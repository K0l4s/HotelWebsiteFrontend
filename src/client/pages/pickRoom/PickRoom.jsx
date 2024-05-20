import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PickRoom.css';
import axios from 'axios';
import server from '../../../api/APIPath';
import { Input, useToast } from '@chakra-ui/react';

const PickRoom = () => {
    const [roomList, setRoomList] = useState([]);
    const [branchAvailable, setBranchAvailable] = useState([]);
    const [serviceList, setServiceList] = useState([]); // [id, name, price, description, image]
    const [choosenService, setChoosenService] = useState([]); // [id, name, price, description, image, amount]
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const roomid = useParams().roomid;
    const [roomType, setRoomType] = useState({});
    const [price, setPrice] = useState(0);
    const [totalPay, setTotalPay] = useState(0);

    const toast = useToast();
    const navigate = useNavigate();

    const calculateTotalPay = () => {
        let total = 0;
        let duration = (new Date(checkOut) - new Date(checkIn)) / 1000 / 60 / 60; // hours
        total += duration * price;
        choosenService.forEach(service => {
            total += parseInt(service.price, 10) * service.amount;
        });
        setTotalPay(total);
    };

    useEffect(() => {
        const initialize = async () => {
            await fetchService();
            await fetchRoomType();
            await fetchBranches();
            if (selectedBranch) {
                await fetchRooms(selectedBranch);
            }
            setDefaultDates();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (selectedBranch) {
            fetchRooms(selectedBranch).then(() => {
                // console.log('fetch room success');
                console.log(selectedBranch);
            }).catch((error) => {
                console.error(error);
            });

        }
    }, [checkIn, checkOut, selectedBranch]);

    useEffect(() => {
        calculateTotalPay();
    }, [checkIn, checkOut, choosenService, price]);

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
            setBranchAvailable(response.data);
            if (response.data.length > 0) {
                setSelectedBranch(response.data[0].id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRooms = async (branchid) => {
        try {
            const response = await axios.get(`${server}/api/v1/room/available?checkIn=${checkIn}&checkOut=${checkOut}&branchId=${branchid}&roomTypeId=${roomid}`);
            setRoomList(response.data);
            if (response.data.length > 0) {
                setSelectedRoom(response.data[0].id);
            } else {
                setSelectedRoom('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRoomType = async () => {
        try {
            const response = await axios.get(`${server}/api/v1/room-type/${roomid}`);
            setRoomType(response.data);
            setPrice(response.data.priceEachRoom);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchService = async () => {
        try {
            const response = await axios.get(`${server}/api/v1/service/all?pageNo=0&pageSize=5&sortBy=id&sortDir=asc`);
            setServiceList(response.data.body.content);
        } catch (error) {
            console.error(error);
        }
    };

    const addServiceToChoose = (service) => {
        const existingService = choosenService.find(item => item.id === service.id);
        if (existingService) {
            existingService.amount += 1;
            setChoosenService([...choosenService]);
        } else {
            service.amount = 1;
            setChoosenService([...choosenService, service]);
        }
    };

    const deleteService = (service) => {
        const newService = choosenService.filter(item => item.id !== service.id);
        setChoosenService(newService);
    };

    const addAmount = (service) => {
        const newService = choosenService.map(item => {
            if (item.id === service.id) {
                item.amount += 1;
            }
            return item;
        });
        setChoosenService(newService);
    };

    const deleteAmount = (service) => {
        const newService = choosenService.map(item => {
            if (item.id === service.id) {
                item.amount = Math.max(item.amount - 1, 0);
            }
            return item;
        }).filter(item => item.amount > 0);
        setChoosenService(newService);
    };

    const createBill = async () => {
        try {
            if (!localStorage.getItem('access_token')) {
                alert('Vui lòng đăng nhập để thực hiện chức năng này');
                return;
            }
            if (!checkIn || !checkOut) {
                alert('Vui lòng chọn ngày checkin và checkout');
                return;
            }
            if (!selectedRoom || !paymentMethod) {
                alert('Vui lòng chọn đầy đủ thông tin');
                return;
            }

            const serviceIds = choosenService.reduce((acc, service) => {
                for (let i = 0; i < service.amount; i++) {
                    acc.push(service.id);
                }
                return acc;
            }, []);

            const data = {
                roomId: selectedRoom,
                checkIn: checkIn,
                checkOut: checkOut,
                paymentMethod: paymentMethod,
                serviceIds: serviceIds,
                total_money: totalPay
            };

            const header = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            };

            const response = await axios.post(`${server}/api/booking/reserveRoom`, data, {
                headers: header.headers
            }).then((response) => {
                toast({
                    title: 'Success',
                    description: 'Đặt phòng thành công',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                navigate(`/payment/${response.data.paymentid}`);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Vui lòng chọn đầy đủ thông tin hoặc xem lại thông tin đã chọn';
            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <div className='pickRoom'>
            <div className="roomInfo">
                <h2>Phòng bạn đang chọn</h2>
                <div className="roomContent">
                    <p>Room id: {roomid}</p>
                    <p>Loại phòng: {roomType.name}</p>
                    <p>Giá thuê: {price} vnđ/giờ</p>
                    <p>Room acreage: {roomType.acreage} m²</p>
                </div>
                <div className='chooseRoom'>
                    <h2>Chọn chi nhánh</h2>
                    <select id='branch' onChange={(e) => {
                        setSelectedBranch(e.target.value);
                    }}>
                        {branchAvailable.map((branch) => (
                            <option key={branch.id} value={branch.id}>{branch.location}</option>
                        ))}
                    </select>
                    <h2>Chọn Phòng</h2>
                    <select onChange={(e) => { setSelectedRoom(e.target.value); console.log(e.target.value); }}>
                        {roomList.map((item) => (
                            <option key={item.id} value={item.id}>{item.number}</option>
                        ))}
                    </select>
                </div>
                <div className="chooseRoom">
                    <h2>CheckIn</h2>
                    <Input
                        id='checkIn'
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        backgroundColor={'grey'}
                        placeholder='Select Date and Time'
                        size='md'
                        type='datetime-local'
                    />
                    <h2>Checkout</h2>
                    <Input
                        id='checkOut'
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        backgroundColor={'grey'}
                        placeholder='Select Date and Time'
                        size='md'
                        type='datetime-local'
                    />
                </div>
            </div>

            <div className="mainItems">
                <div className="service">
                    <h2>Các dịch vụ chọn kèm</h2>
                    <div className="chooseService">
                        <h2>Chọn thêm dịch vụ</h2>
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
                                            <button onClick={() => addAmount(service)}>+</button>
                                            <input type="number" value={service.amount} readOnly />
                                            <button onClick={() => deleteAmount(service)}>-</button>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteService(service)}>Xóa</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="chooseService">
                        <h2>Chọn thêm dịch vụ</h2>
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
                                    <button onClick={() => addServiceToChoose(service)}>Thêm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="paymentMethod">
                    <h2>Chọn phương thức thanh toán</h2>
                    <div className="paymentItem">
                        <p>Tổng số tiền giao dịch: {totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</p>
                        <input type="radio" name="payment" id="CASH" value="cash" onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="CASH">Thanh toán tiền mặt</label>
                    </div>
                    <div className="paymentItem">
                        <input type="radio" name="payment" id="CARD" value="card" onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="CARD">Thanh toán qua thẻ</label>
                    </div>
                    <button onClick={() => createBill()}>Thanh toán</button>
                </div>
            </div>
        </div>
    );
};

export default PickRoom;
