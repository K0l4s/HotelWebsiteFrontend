import React, { useEffect } from 'react'
import './ConfirmAccount.css'
import { useNavigate, useParams } from 'react-router-dom';
const ConfirmAccount = () => {
    const username = useParams().username;
    const navigate = useNavigate();
    const handleConfirm=()=>{
        const code = document.getElementById('code').value;
        console.log("code",code);
        const url = `http://localhost:9090/api/confirmAccount?username=${encodeURIComponent(username)}&code=${encodeURIComponent(code)}`;
        submit(url);
        if(url)
            navigate('/login');
    }
    const submit = async (url) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
            
        })
        const data = await res.json()
        console.log(data)
    }
    const checkActive = async () => {
        const url = `http://localhost:9090/api/isConfirm?username=${encodeURIComponent(username)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
            
        })
        const data = await res.json()
        console.log(data)
        if(data){
            navigate('/login');
        }
    }
    const check = useEffect(()=>{
        checkActive();
    },[])
  return (
    <div>
        <span className="confirmAccountTitle">Confirm Account</span>
        <p>Hello, {username}! Please enter your code to confirm your account. Check your email you used to register our service!</p>
        <input id="code" type="text" placeholder='Your code. Example: 000000'/>
        <button onClick={handleConfirm}>Confirm</button>
    </div>
  )
}

export default ConfirmAccount