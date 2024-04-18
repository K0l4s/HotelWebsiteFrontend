import React, { useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import APIPath from '../../config/APIPath'
const Login = () => {
  const navigate = useNavigate();
  const checkLogin = useEffect(() => {
    try {
      fetch(APIPath+'/checkLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          loginCode: localStorage.getItem("loginCode")
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data === true) {
            navigate("/");
          }
        }
        )
        .catch(err => console.log(err))

    } catch (err) {
      console.log(err)
    }
  }, [])
  const connectAPI = () => {
    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      fetch(APIPath+'/login?username=' + username + '&password=' + password, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          console.log(data.body.loginCode)
          localStorage.setItem("username", username);
          localStorage.setItem("loginCode", data.body.loginCode);
          navigate("/");
        }
        )
        .catch(err => console.log(err))

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='login'>
      <h1>Đăng nhập</h1>
      <div className="inputAndText">
        <p>Tên đăng nhập:</p>
        <input id='username' type="text" placeholder="Tên đăng nhập" />
      </div>
      <div className="inputAndText">
        <p>Mật khẩu:</p>
        <input id='password' type="password" placeholder="Mật khẩu" />
      </div>
      <button className='loginBtn' onClick={connectAPI}>Đăng nhập</button>
      <p className="url">Quên mật khẩu?</p>
      <p className="url" onClick={() => navigate("/register")}>Chưa có tài khoản?</p>

    </div>
  )
}

export default Login