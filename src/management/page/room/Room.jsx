import React, { useEffect, useState } from 'react'
import './Room.css'
import axios from 'axios';
import server from '../../../api/APIPath';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
const Room = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchRoomTypes();
    }, []);
    const fetchRoomTypes = async () => {
        axios.get(server + "/api/v1/management/room-type/all",
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then((response) => {
                console.log(response.data);
                setRoomTypes(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }
  return (
    <div className='roomPage'>
        <h1>Loại phòng hiện có</h1>
        <button>Thêm loại phòng mới</button>
        <table>
            <tr>
                <th>ID</th>
                <th>Tên phòng</th>
                <th>Giá</th>
                <th>Diện tích</th>
                <th>Mô tả</th>
                <th>Quản lý</th>
            </tr>
            {roomTypes.map((roomType) => (
                <tr>
                    <td>{roomType.id}</td>
                    <td>{roomType.name}</td>
                    <td>{roomType.priceEachRoom}</td>
                    <td>{roomType.acreage}</td>
                    <td>{roomType.description}</td>
                    <td>
                        <button><FaEdit color='yellow'/></button>
                        <button><MdDeleteForever color='pink'/></button>
                        <button onClick={()=>navigate(`/admin/room/${roomType.id}`)}><TbListDetails/></button>
                    </td>
                </tr>
            ))}
            {roomTypes.length<1 && (<tr>
                    <td colSpan="6">No data</td>
                </tr>
                )
                }
        </table>
    </div>
  )
}

export default Room