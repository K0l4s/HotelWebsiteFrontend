import React, { useState } from 'react';
import './AddServiceModal.css';
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const AddServiceModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const saveService = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }
   
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('isDeleted', false);
    // formData.append('image', document.getElementById('image').files);
    const files = document.getElementById('image').files;
    for (let i = 0; i < files.length; i++) {
      formData.append('imageFiles', files[i]);
    }
    //
    console.log(formData.get('name'));

    if (formData.get('name') === '' || formData.get('price') === '' || formData.get('salePercent') === '' || formData.get('description') === '') {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    axios.post('http://localhost:9090/api/v1/management/service/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      // alert('Thêm dịch vụ thành công');
      toast({
        title: "Thêm dịch vụ thành công",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      onClose();
    }).catch(err => {
      console.error(err);
      // alert('Thêm dịch vụ thất bại');
      toast({
        title: "Thêm dịch vụ thất bại",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm dịch vụ mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="">
              <div className="form-group">
                <label htmlFor="name">Tên dịch vụ</label>
                <input required type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input required type="number" className="form-control" id="price" />
              </div>
              {/* <div className="form-group">
                <label htmlFor="salePercent">Phần trăm giảm giá (vd: 10%)</label>
                <input type="number" className="form-control" id="salePercent" />
              </div> */}
              <div className="form-group">
                <label htmlFor="description">Mô tả dịch vụ</label>
                <input required type='text' className="form-control" id="description" />
              </div>
              <div className="form-group">
                <label htmlFor="image">Upload hình ảnh</label>
                {/* <input required type='file' className="form-control" id="image" /> */}
                {/* Upload multiple image */}
                <input required type='file' className="form-control" id="image" multiple />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={saveService}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddServiceModal;
