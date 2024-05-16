import React, { useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import APIPath from '../../../api/APIPath'
import apiService from '../../../api/apiService'
const Login = () => {
  const navigate = useNavigate();
  const logIn = () =>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
      "email": email,
      "password": password
    }
    apiService.post("/api/v1/auth/authenticate", data)
      // .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          navigate('/home');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className='login'>
      <h1>Đăng nhập</h1>
      <div className="inputAndText">
        <p>Tên đăng nhập:</p>
        <input id='email' type="text" placeholder="Email đăng nhập" />
      </div>
      <div className="inputAndText">
        <p>Mật khẩu:</p>
        <input id='password' type="password" placeholder="Mật khẩu" />
      </div>
      <button className='loginBtn' onClick={logIn}>Đăng nhập</button>
      <p className="url">Quên mật khẩu?</p>
      <p className="url" onClick={() => navigate("/register")}>Chưa có tài khoản?</p>

    </div>
  )
}

export default Login