import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import server from '../../../../api/APIPath';
import axios from 'axios';
const UpdateRoomTypeModal = ({isOpen,onClose, id}) => {
    const saveImage = () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const formData = new FormData();
        // formData.append('image', document.getElementById('images').files);
        const image = document.getElementById('images').files;
        for(let i=0; i<image.length; i++){
            formData.append('imageFiles', image[i]);
        }

      axios({
        method: 'PUT',
        url: server + `/api/v1/management/room-type/update/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: formData
      }).then(res => {
        console.log(res.data);
        onClose();
      }
        ).catch(err => {
            console.error(err);
        });
    }
  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa phòng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{id}</p>
            <input type='file' id='images' placeholder='Hình ảnh' multiple/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={saveImage}>
              Lưu
            </Button>
            <Button variant='ghost' onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UpdateRoomTypeModal