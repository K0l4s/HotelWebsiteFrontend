import React from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import apiService from '../../../api/apiService';
const Register = () => {
  const navigate = useNavigate();
  const sendRegister = async () => {
    const user = {
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      password: document.getElementById("password").value,
      address: document.getElementById("address").value,
      birthday: document.getElementById("birthday").value
    }
    // console.log(user);
    apiService.post("/api/v1/auth/register", user)
    .then(res => {
      // console.log(res.data);
      navigate('/confirm-register/'+res.email);
    })
    .catch(err => {
      console.log(err.response.data);
    });
  // You can add further logic here, such as sending the PIN to an API
    
    // console.log(sendRequest);
    // if(sendRequest.email!==undefined){
    //   alert("Đăng ký thành công!");
    //   navigate("/confirm-register/"+sendRequest.email);
    // }
    // const response = await apiService.post(APIPath.register, user);
    // if(response.status === 200){
    //   alert("Đăng ký thành công!");
    //   navigate("/login");
    // }
  }
  return (
    <div className="register">
      <h1 className="registerTitle">Register</h1>
      <div className="registerForm">
        <label>Tên đầy đủ</label>
        <input type="text" id="fullname" className="registerInput" placeholder="Enter your username..." />
        <label>Email</label>
        <input type="text" id="email" className="registerInput" placeholder="Enter your email..." />
        <label>Số điện thoại</label>
        <input type="text" id="phoneNumber" className="registerInput" placeholder="Enter your phone..." />
        <label>Password</label>
        <input type="password" id="password" className="registerInput" placeholder="Enter your password..." />
        <label>Địa chỉ</label>
        <input type="text" id="address" className="registerInput" placeholder="Enter your address..." />
        <label>Ngày sinh</label>
        <input type="date" id="birthday" className="registerInput" placeholder="Enter your birthday..." />
        <button onClick={sendRegister} className="registerButton">Register</button>
      {/* <button className="registerLoginButton" onClick={()=>navigate("/login")}>Login</button> */}
      <p onClick={()=>navigate("/login")}>Have account? Login here!</p>
      </div>
    </div>
  )
}

export default Register