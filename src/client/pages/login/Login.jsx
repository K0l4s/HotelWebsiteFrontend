import React, { useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import server from '../../../api/APIPath'
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const logIn = () =>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
      "email": email,
      "password": password
    }
    // apiService.post("/api/v1/auth/authenticate", data)
      // .then(res => res.json())
      axios.post(server + "/api/v1/auth/authenticate", data)
      .then(res => {
        console.log(res);
        if (res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          navigate('/home');
          toast({
          title: "Đăng nhập thành công",
          description: "Chúc bạn có trải nghiệm tuyệt vời",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
        }
      })
      .catch(err => {
        toast({
          title: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra lại thông tin đăng nhập",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
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