import React, { useEffect, useState } from 'react'
import './ContactManagement.css'
import axios from 'axios';
import server from '../../../api/APIPath';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
const ContactManagement = () => {
    const [contact, setContact] = useState([]);
    useEffect(() => {
        fetchContact();
    }, []);
    const fetchContact = async () => {
        try {
            axios(
                {
                    method: 'GET',
                    url: `${server}/api/v1/management/contact/all/0`,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                }
            ).then(response => {
                setContact(response.data.body);
                console.log(response.data.body);
            }

            )
        }
        catch (error) {
            console.error(error);
        }
    }
    const completeTask = async (id) => {
        try {
            axios(
                {
                    method: 'POST',
                    url: `${server}/api/v1/management/contact/${id}`,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                }
            ).then(response => {
                // fetchContact();
                setContact(contact.filter(item => item.id !== id));

            }
                
                )
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Thông tin hợp tác</h2>
            <table>
                <tr>
                <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Yêu cầu</th>
                    <th>Thao tác</th>
                </tr>
                {contact.length === 0 && <tr><td colSpan="6">Không có dữ liệu</td></tr>}
                {contact.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNo}</td>
                            <td>{item.content}</td>
                            <td><button onClick={()=>completeTask(item.id)}><IoCheckmarkDoneCircleSharp /></button></td>
                        </tr>
                    )
                })} 
            </table>
        </div>
    )
}

export default ContactManagement