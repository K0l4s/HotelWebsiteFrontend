import React from 'react'
import './Contact.css'
import server from '../../../api/APIPath'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
const Contact = () => {
  const toast = useToast();
  const handleSubmit = () => {
    const contact = {
      "name": document.getElementById('name').value,
      "email": document.getElementById('email').value,
      "phoneNo": document.getElementById('phone').value,
      "content": document.getElementById('content').value
    }

    sendData(contact);
    // console.log(name, email, phone, content)
  }
  const sendData = (contact) => {
    axios.post(server + '/api/v1/contact/create', contact)
      .then((response) => {
        console.log(response.data)
        if (response.data.status === true) {
          toast({
            title: "Thông báo",
            description: "Gửi thông tin thành công!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })

        } else {
          toast({
            title: "Thông báo",
            description: "Gửi thông tin thất bại!",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch((error) => {
        console.log(error)
        alert('Gửi thông tin thất bại!')
      })
  }
  return (
    <div className='contact'>
      <div className="box">
      <h2>Liên hệ</h2>
      <p>Hãy điền thông tin vào box phía dưới! Chúng tôi sẽ cố gắng phản hồi sớm nhất có thể!</p>
      <hr></hr>
      <p>Họ và tên:</p>
      <input id='name' type="text" placeholder="Họ và tên" />
      <p>Email liên hệ:</p>
      <input id='email' type="text" placeholder="Email liên hệ" />
      <p>Số điện thoại:</p>
      <input id='phone' type="text" placeholder="Số điện thoại" />
      <p>Nội dung liên hệ:</p>
      <textarea id='content' placeholder="Nội dung"></textarea>
      <button className='sendBtn'onClick={handleSubmit}>Gửi</button>
      </div>
    </div>
  )
}

export default Contact