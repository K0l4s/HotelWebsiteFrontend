import React, { useState } from 'react';
import './AddService.css';
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import server from '../../../config/APIPath';
import APIInformation from '../../../config/APIInformation';

const AddServiceModal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Chuyển NodeList thành mảng
    setImage(files[0]); // Lưu chỉ 1 tệp hình ảnh, hoặc thay đổi tùy vào yêu cầu
  };

  const saveService = () => {
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('price', document.getElementById('price').value);
    //formData.append('salePercent', document.getElementById('salePercent').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('deleted', false);
    //formData.append('image', image);

    if (formData.get('name') === '' || formData.get('price') === '' || formData.get('salePercent') === '' || formData.get('description') === '') {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    fetch(server + '/admin/service/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data' + image,
        'Authorization': 'Basic ' + btoa(APIInformation.username + ":" + APIInformation.password)
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        onClose();
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm dịch vụ mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="">
              <div className="form-group">
                <label htmlFor="name">Tên dịch vụ</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input type="number" className="form-control" id="price" />
              </div>
              <div className="form-group">
                <label htmlFor="salePercent">Phần trăm giảm giá (vd: 10%)</label>
                <input type="number" className="form-control" id="salePercent" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả dịch vụ</label>
                <input type='text' className="form-control" id="description" />
              </div>
              <div className="form-group">
                <label htmlFor="image">Upload hình ảnh</label>
                <input type='file' onChange={handleImageChange} className="form-control" id="image" />
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
