import React, { useEffect, useState } from 'react'
import './ConfirmAccount.css'
import { useNavigate, useParams } from 'react-router-dom';
import { HStack, PinInput, PinInputField, useToast } from "@chakra-ui/react"
import apiService from '../../../../api/apiService';
import axios from 'axios';
import server from '../../../../api/APIPath';
const ConfirmAccount = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { email } = useParams();

    const [pin, setPin] = useState('');

  const handlePinChange = (value) => {
    setPin(value);
  };

  const handleSubmit = () => {
    // console.log('Entered PIN:', pin);
    const data = {
      "email":email,
      "code":pin
    }
    // apiService.post("/api/v1/auth/confirm-email", data)
      axios.post(server+"/api/v1/auth/confirm-email", data)
      .then(res => {
        console.log(res);
        localStorage.setItem("access_token",res.data.access_token);
        localStorage.setItem("refresh_token",res.data.refresh_token);
        navigate("/home")
      })
      .catch(err => {
        console.log(err.response.data);
      });
    // You can add further logic here, such as sending the PIN to an API
  };
  // const getDataByJWT = () =>{
  //   const token = localStorage.getItem("access_token",access_token)
  //   apiService.get
  // }
  return (
    <div>
        <span className="confirmAccountTitle">Confirm Account</span>
        <p>Hello, {email}! Please enter your code to confirm your account. Check your email you used to register our service!</p>
        <HStack>
        <PinInput otp id='pin' onChange={handlePinChange}>
          {[...Array(6)].map((e, i) => (
            <PinInputField key={i} id={`pin${i + 1}`} />
          ))}
        </PinInput>
      </HStack>
        <button onClick={handleSubmit}>Confirm</button>
    </div>
  )
}

export default ConfirmAccount