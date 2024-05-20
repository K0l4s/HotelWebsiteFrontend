import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import server from '../../../../api/APIPath';
import axios from 'axios';
import './DetailRoom.css'
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import AddRoomModal from '../../../components/modal/addRoom/AddRoomModal';
const DetailRoom = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const [currentLocation, setCurrentLocation] = useState('[Chưa chọn chi nhánh]');

    const [roomTypeInfo, setRoomTypeInfo] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    const [isOpened, setIsOpened] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const onCloseCreate = () => {
        setIsOpened(false);
        // Reload trang
        window.location.reload();

    }

    let price = 0;
    if (roomTypeInfo.priceEachRoom)
        price = roomTypeInfo.priceEachRoom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let acreage = 0;
    if (roomTypeInfo.acreage)
        acreage = roomTypeInfo.acreage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    useEffect(() => {
        fetchRoomTypes();
    }, [id])

    const fetchRoomTypes = async () => {
        axios.get(server + `/api/v1/management/room-type/${id}`,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then((response) => {
                console.log(response.data);
                setRoomTypeInfo(response.data);
                fetchBranches();
            }).catch((error) => {
                console.log(error);
            });
    }
    const fetchRooms = async (branchid) => {
        axios.get(server + `/api/v1/management/room-type/list-room?roomTypeId=${id}&branchId=${branchid}`,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then((response) => {
                console.log(response.data);
                setRoomList(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }
    const fetchBranches = async () => {
        axios.get(server + `/api/v1/management/room-type/${id}/list-branch`,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then((response) => {
                console.log(response.data);
                setBranchList(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='roomType'>
            <div className="header">
                <h2>Chi tiết loại phòng</h2>
                <div className="buttonGroup">
                <button onClick={()=>setIsOpened(true)}>Đăng ký loại phòng cho chi nhánh</button>
                    {/* <button>Sửa</button>
                    <button>Xóa</button> */}
                    <button onClick={()=>navigate("/admin/room")}>Quay lại</button>
                </div>
            </div>
            <div className="roomTypeInformation">
                <p>ID: {roomTypeInfo.id}</p>
                <p>Tên phòng: {roomTypeInfo.name}</p>
                <p>Giá: {price}</p>
                <p>Diện tích: {acreage} m2</p>
                <p>Mô tả: {roomTypeInfo.description}</p>

            </div>
            <div className="tableContent">
                <div className='branch'>
                    <h2>Các chi nhánh hỗ trợ phòng</h2>
                    <table >
                        <tr>
                            <th>ID</th>
                            <th>Địa chỉ</th>
                            {/* <th>Quản lý</th> */}
                        </tr>
                        {branchList.length === 0 ? (
                            <tr>
                                <td colSpan="3">Không có dữ liệu</td>
                            </tr>
                        ) : null}
                        {branchList.map((branch, index) => (
                            <tr className='branchItems' id={"branch" + branch.id} key={index} onClick={() => {
                                fetchRooms(branch.id);
                                // document.getElementById("branch"+branch.id).style.backgroundColor = "lightblue";
                                // Thêm .active vào branch được chọn
                                
                                // Xóa class active của các branch khác
                                let branchItems = document.getElementsByClassName("branchItems");
                                for (let i = 0; i < branchItems.length; i++) {
                                    branchItems[i].classList.remove("active");
                                }
                                

                                    document.getElementById("branch" + branch.id).classList.add("active");
                                setCurrentLocation(branch.location);
                                // document.getElementById("branch"+branch.id)
                            }
                            }>
                                <td>{branch.id}</td>
                                <td>{branch.location}</td>
                                {/* <td>
                                    <button><MdDeleteForever/></button>
                                    <button><FaEdit/></button>
                                </td> */}
                            </tr>
                        ))}
                        {/* Nếu không có branchList thì thông báo rỗng */}
                    </table>
                </div>
                <div className='roomByBranch'>
                    <h2>Các phòng có trong chi nhánh {currentLocation}</h2>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Số phòng</th>
                            <th>Trạng thái</th>
                            {/* <th>Quản lý</th> */}
                        </tr>
                        {roomList.map((room, index) => (
                            // Nếu room.status là đang isBooking thì background color màu xanh lá
                            room.status === "isBooking"? 
                                (<tr key={index} style={{backgroundColor: "red",fontWeight:"bold"}}>
                                <td>{room.id}</td>
                                <td>{room.number}</td>
                                <td>Đang có khách đặt</td>
                                {/* <td>
                                    <button><MdEdit/></button>
                                    <button><FaEdit/></button>
                                </td> */}
                            </tr>)
                            :
                            (<tr key={index}>
                                <td>{room.id}</td>
                                <td>{room.number}</td>
                                <td>Phòng hiện đang trống</td>
                                {/* <td>
                                    <button><MdEdit/></button>
                                    <button><FaEdit/></button>
                                </td> */}
                            </tr>)
                        ))}
                        {/* Nếu không có roomList thì thông báo rỗng */}
                        {roomList.length === 0 ? (
                            <tr>
                                <td colSpan="4">Không có dữ liệu</td>
                            </tr>
                        ) : null}
                    </table>
                </div>
            </div>
            <AddRoomModal isOpen={isOpened} onClose={onCloseCreate} typeid={id} />
        </div>
    )
}

export default DetailRoom