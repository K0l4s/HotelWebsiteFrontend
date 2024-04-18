import React from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const user = {
      "username": document.getElementById('username').value,
      "email": document.getElementById('email').value,
      "phoneNumber": document.getElementById('phoneNumber').value,
      "password": document.getElementById('password').value
    }
    console.log("user", user)
    submit(user)
  }
  const submit = async (user) => {
    const res = await fetch('http://localhost:9090/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    console.log(data)
    // Check status is 200
    if (data.username !== undefined && data.username !== null && data.username !== "" ) {
      navigate(`/confirmAccount/${user.username}`)
    }
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <div className="registerForm">
        <label>Username</label>
        <input type="text" id="username" className="registerInput" placeholder="Enter your username..." />
        <label>Email</label>
        <input type="text" id="email" className="registerInput" placeholder="Enter your email..." />
        <label>Phone</label>
        <input type="text" id="phoneNumber" className="registerInput" placeholder="Enter your phone..." />
        <label>Password</label>
        <input type="password" id="password" className="registerInput" placeholder="Enter your password..." />
        <button className="registerButton" onClick={handleSubmit}>Register</button>
      <button className="registerLoginButton" onClick={()=>navigate("/login")}>Login</button>
      </div>
    </div>
  )
}

export default Register