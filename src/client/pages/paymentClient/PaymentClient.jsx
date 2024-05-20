import React from 'react'
import { useParams } from 'react-router-dom'

const PaymentClient = () => {
    const id = useParams().id
  return (
    <div>PaymentClient</div>
  )
}

export default PaymentClient