import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import server from '../../../../api/APIPath';

const AddRoomModal = ({ typeid, isOpen, onClose }) => {
    const [branchid, setBranchid] = useState('');
    const [branchList, setBranchList] = useState([]);
    
    const creatRoom = () => {
        const block = document.getElementById('block').value;
        const floor = document.getElementById('floor').value;
        const number = document.getElementById('number').value;
        // Tạo một dãy danh sách phòng có định dạng
        // [Block][Floor][Number]
        // Ví dụ: A101
        let roomList = [];
        for (let i = 1; i <= floor; i++) {
            for (let j = 1; j <= number; j++) {
                roomList.push(
                    {
                        number: block + i + j,
                        branchid: branchid,
                        roomtypeid: typeid
                    }
                );
            }
        }
        const token = localStorage.getItem('access_token');
        axios({
            method: 'POST',
            url: server + '/api/v1/management/room/save-room-list',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: roomList
        }).then((response) => {
            console.log(response.data);
            onClose();
        }).catch((error) => {
            console.log(error);
        });

        console.log(roomList);
    }
    const fetchBranch = async () => {
        const token = localStorage.getItem('access_token');
        const response = await axios({
            method: 'GET',
            url: server + '/api/v1/management/branch/all?showAll=false&showInActive=false',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setBranchList(response.data.body);
        if(response.data.body.length > 0)
            setBranchid(response.data.body[0].id);
    }
    useEffect(() => {
        fetchBranch();
    }, [])
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đăng ký loại phòng cho chi nhánh</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="">
             <select onChange={(e)=>setBranchid(e.target.value)} placeholder='Chọn chi nhánh'>
                {branchList.map((branch, index) => (
                    <option key={index} value={branch.id}>{branch.location}</option>
                ))}
             </select>
             <label>Block</label>
             <input id='block' type="text" placeholder='A'/>
             <label>Số lượng tầng</label>
             <input id='floor' type="text" placeholder='1'/>
             <label>Số lượng phòng trên 1 tầng</label>
             <input id='number' type="text" placeholder='15'/>
            </div>
            <button onClick={creatRoom}>Tạo phòng</button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddRoomModal