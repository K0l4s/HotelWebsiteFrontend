import React from 'react'
import './Contact.css'
import APIPath from '../../api/APIPath'
const Contact = () => {
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
    fetch(APIPath+'/contact/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    }).then(response => response.json())
      .then(data => {
        if (data.status === true) {
          alert('Gửi thông tin thành công!')
        } else {
          alert('Gửi thông tin thất bại!')
        }
      })
  }
  return (
    <div className='contact'>
      <div className="box">
      <h1>Liên hệ</h1>
      <p>Hãy điền thông tin vào box phía dưới! Chúng tôi sẽ cố gắng phản hồi sớm nhất có thể!</p>
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