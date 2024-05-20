import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './payment.css';
import server from '../../../api/APIPath';

const Payment = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [branchId, setBranchId] = useState('');
  const [roomTypeId, setRoomTypeId] = useState('');
  const [revenue, setRevenue] = useState(null);
  const [error, setError] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const token = localStorage.getItem('access_token');

  const handleCalculate = () => {
    setShouldFetch(true);
  };

  useEffect(() => {
    if (shouldFetch) {
      const fetchRevenue = async () => {
        try {
          setError('');
          const formData = new FormData();
          formData.append('startDate', startDate);
          formData.append('endDate', endDate);
          if (branchId) formData.append('branchId', branchId);
          if (roomTypeId) formData.append('roomTypeId', roomTypeId);

          const response = await axios({
            method: 'GET',
            url: server+'/api/v1/management/payment/revenue',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            params: {
              startDate,
              endDate,
              branchId: branchId || null,
              roomTypeId: roomTypeId || null,
            },
          });
          setRevenue(response.data.body);
        } catch (err) {
          setError('Failed to calculate revenue');
          setRevenue(null);
        } finally {
          setShouldFetch(false);
        }
      };

      fetchRevenue();
    }
  }, [shouldFetch, startDate, endDate, branchId, roomTypeId, token]);

  return (
    <div className="revenue-container">
      <h2>Revenue Calculation</h2>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Branch ID (Optional):</label>
        <input
          type="number"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Room Type ID (Optional):</label>
        <input
          type="number"
          value={roomTypeId}
          onChange={(e) => setRoomTypeId(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate Revenue</button>
      {error && <div className="error-message">{error}</div>}
      {revenue !== null && (
        <div className="revenue-result">
          <h3>Total Revenue: ${revenue}</h3>
        </div>
      )}
    </div>
  );
};

export default Payment;
