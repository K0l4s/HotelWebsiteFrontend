import React, { useState } from 'react';
import {Modal,ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button} from '@chakra-ui/react';
import server from '../../../config/APIPath';
import './AddBranch.css'
import APIInformation from '../../../config/APIInformation';
const AddBranchModal = ({isOpen, onClose,responseData}) => {
  function saveBranch() {
    const branch = {
      location: document.getElementById('location').value,
      deleted:  document.getElementById('deleted').value === 'Đã ẩn' ? true : false
    };
    console.log(branch);
    fetch(server+'/admin/branch/create', { method: 'POST', headers: { 'Content-Type': 'application/json' 
    , 'Authorization': 'Basic ' + btoa(APIInformation.username + ":" + APIInformation.password)}, body: JSON.stringify(branch)
   })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      onClose();
    });}
    
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm chi nhánh mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="">
              <div className="form-group">
                <label htmlFor="location">Địa chỉ</label>
                <input type="text" className="form-control" id="location" />
              </div>
              <div className="form-group">
                <label htmlFor="deleted">Trạng thái</label>
                <select className="form-control" id="deleted">
                <option>Hoạt động</option>
                  <option>Đã ẩn</option>
                  
                </select>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' mr={3} onClick={saveBranch}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddBranchModal;
