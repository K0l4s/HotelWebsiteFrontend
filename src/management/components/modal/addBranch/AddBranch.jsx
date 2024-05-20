import React, { useState } from 'react';
import {Modal,ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button} from '@chakra-ui/react';

import './AddBranch.css';
import axios from 'axios';
import server from '../../../../api/APIPath';
const AddBranchModal = ({isOpen, onClose,responseData}) => {
  function saveBranch() {
    // const branch = {
    //   location: document.getElementById('location').value
    // };
    const formdata = new FormData();
    formdata.append("location", document.getElementById('location').value);

    axios.post(server + '/api/v1/management/branch/create', formdata, 
    { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } }
    ).then((response) => {
      console.log(response.data);
      onClose();
    }
    ).catch((error) => {
      console.log(error);
    }
    );

  }
    
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xs'>
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
