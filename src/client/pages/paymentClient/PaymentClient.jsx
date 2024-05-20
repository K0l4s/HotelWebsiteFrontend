import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import server from '../../../api/APIPath';
import axios from 'axios';

const PaymentClient = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchPaymentInfor = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/payment/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      });
      setPayment(response.data.body);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const completePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`${server}/api/v1/payment/${id}`, {}, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      });
      setPayment(response.data.body);
    }
    catch (error) {
      setError(error);
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPaymentInfor();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Lỗi truy cập: {error.message}</p>;
  }

  return (
    <div>
      <h1>Thanh toán</h1>
      <h2>Thông tin thanh toán</h2>
      {payment ? (
        <>
          <p>Trạng thái thanh toán: {payment.paymentStatus}</p>
          {payment.booking ? (
            <>
              <p>Thời gian Checkin: {formatDate(payment.booking.checkIn)}</p>
              <p>Thời gian Checkout: {formatDate(payment.booking.checkOut)}</p>
              <p>Booking id: {payment.booking.bookingId}</p>
              <p>Ngày lập hóa đơn: {formatDate(payment.timestamp)}</p>
            </>
          ) : (
            <p>Không có thông tin để hiển thị.</p>
          )}
          <p>Phương thức thanh toán: {payment.paymentMethod}</p>
        </>
      ) : (
        <p>Không có thông tin để hiển thị.</p>
      )}
      {payment.paymentStatus === 'waiting' && 
        (<>
        <p>Số thẻ: </p>
        <input type="text" />
        <p>Ngày hết hạn: </p>
        <input type="text" />
        <p>Mã CVV: </p>
        <input type="text" />
        <p>Chủ thẻ: </p>
        <input type="text" />
        <p>Ngân hàng: </p>
        <input type="text" />
        <button onClick={()=>completePayment()}>Hoàn tất thanh toán</button>
        </>)
      }
    </div>
  );
}

export default PaymentClient;
