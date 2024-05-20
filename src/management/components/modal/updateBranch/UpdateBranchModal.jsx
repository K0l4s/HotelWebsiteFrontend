import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import axios from 'axios'
import server from '../../../../api/APIPath'

const UpdateBranchModal = ({ isOpen, onClose, branchid }) => {
  const [branch, setBranch] = useState({
    location: ''
  })

  useEffect(() => {
    if (branchid) {
      axios.get(`${server}/api/v1/management/branch/${branchid}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      }).then((response) => {
        if (response.data) {
          setBranch({
            location: response.data.location || ''
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [branchid])

  const handleChange = (e) => {
    const { name, value } = e.target
    setBranch(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const saveData = async () => {
    const savedBranch = {
      location: branch.location
    }
    try {
      const response = await axios.put(server+`/api/v1/management/branch/${branchid}/update`, savedBranch, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      })
      console.log(response.data)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa dịch vụ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>ID: </p>
            <input type="text" id="branchId" name="branchId" value={branchid} disabled />
            <p>Địa chỉ: </p>
            <input type="text" id="location" name="location" value={branch.location} onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={saveData}>
              Lưu
            </Button>
            <Button variant='ghost' onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UpdateBranchModal
