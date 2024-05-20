import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import axios from 'axios';
import server from '../../../../api/APIPath';
const AddRoomTypeModal = ({ isOpen, onClose }) => {
  const addRoomType = async () => {
    try {
      // const data = {
      //   "name": document.getElementById('name').value.toString(),
      //   "priceEachRoom": parseFloat(document.getElementById('priceEachRoom').value),
      //   "acreage": parseFloat(document.getElementById('acreage').value),
      //   "description": document.getElementById('description').value.toString()
      // };
      const data = new FormData();
      data.append('name', document.getElementById('name').value.toString());
      data.append('priceEachRoom', parseFloat(document.getElementById('priceEachRoom').value));
      data.append('acreage', parseFloat(document.getElementById('acreage').value));
      data.append('description', document.getElementById('description').value.toString());
      console.log(data)
      const token = localStorage.getItem('access_token');

      const response = await axios({
        method: 'POST',
        url: server + '/api/v1/management/room-type/create',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: data
      });

      console.log(response.data);
      // onClose();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div >
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tạo loại phòng mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <div>
              <label htmlFor='name'>Tên loại phòng</label>
              <input id='name' type='text' />
              </div>
              <div>
              <label htmlFor='priceEachRoom'>Giá</label>
              <input id='priceEachRoom' type='number' />
              </div>
              <div>
              <label htmlFor='acreage'>Diện tích</label>
              <input id='acreage' type='number' />
              </div>
              <div>
              <label htmlFor='description'>Mô tả</label>
              <input id='description' type='text' />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={addRoomType} colorScheme='blue' mr={3}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddRoomTypeModal;
