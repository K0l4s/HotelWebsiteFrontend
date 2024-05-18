import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import server from '../../../../api/APIPath';
import axios from 'axios';
import './DetailRoom.css'
const DetailRoom = () => {
    const id = useParams().id;

    const [roomTypeInfo, setRoomTypeInfo] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [roomList, setRoomList] = useState([]);
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
                <h1>Chi tiết loại phòng</h1>
                <div className="buttonGroup">
                    <button>Sửa</button>
                    <button>Xóa</button>
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
                    <h1>Các chi nhánh hỗ trợ phòng</h1>
                    <table >
                        <tr>
                            <th>ID</th>
                            <th>Địa chỉ</th>
                            <th>Quản lý</th>
                        </tr>
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

                                // document.getElementById("branch"+branch.id)
                            }
                            }>
                                <td>{branch.id}</td>
                                <td>{branch.location}</td>
                                <td>
                                    <button>Xóa</button>
                                    <button>Chỉnh sửa</button>
                                </td>
                            </tr>
                        ))}
                        {/* Nếu không có branchList thì thông báo rỗng */}
                    </table>
                </div>
                <div className='roomByBranch'>
                    <h1>Các phòng có trong chi nhánh</h1>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Số phòng</th>
                            <th>Trạng thái</th>
                            <th>Quản lý</th>
                        </tr>
                        {roomList.map((room, index) => (
                            <tr key={index}>
                                <td>{room.id}</td>
                                <td>{room.number}</td>
                                <td>{room.status}</td>
                                <td>
                                    <button>Xóa</button>
                                    <button>Chỉnh sửa</button>
                                </td>
                            </tr>
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

        </div>
    )
}

export default DetailRoom