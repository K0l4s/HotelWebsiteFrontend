import React, { useState, useEffect } from 'react';
import apiService from '../../../api/apiService';
import './payment.css';
import { useToast } from '@chakra-ui/react'
import server from '../../../api/APIPath';
import axios from 'axios';

const Payment = () => {
  const toast = new useToast();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [branchId, setBranchId] = useState('');
  const [roomTypeId, setRoomTypeId] = useState('');
  const [revenue, setRevenue] = useState(null);
  const [error, setError] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [branches, setBranches] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const token = localStorage.getItem('access_token');

  const handleCalculate = () => {
    setShouldFetch(true);
  };

  const header = {
    Authorization: `Bearer ${token}`,
  }
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        // const response = await axios.get(server+"/api/v1/management/branch/all", header);
        axios(
          {
            method: 'GET',
            url: server + '/api/v1/management/branch/all',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        ).then((response) => {
          setBranches(response.data);
          console.log(branches)
        }).catch((error) => {
          setError('Failed to fetch branches');
        });

      } catch (err) {
        setError('Failed to fetch branches');
      }

      fetchBranches();
    }
  }, [token]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        axios(
          {
            method: 'GET',
            url: server + '/api/v1/management/room-type/all',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        ).then((response) => {
          setRoomTypes(response.data);
        }).catch((error) => {
          setError('Failed to fetch room types');
        });
      }
      catch (err) {
        setError('Failed to fetch room types');
      }}

    fetchRoomTypes();
  }, [token]);

  useEffect(() => {
    if (shouldFetch) {
      const fetchRevenue = async () => {
        try {
          setError('');

          const params = {
            startDate,
            endDate,
            branchId: branchId || undefined,
            roomTypeId: roomTypeId || undefined,
          };

          // Gọi API bằng phương thức get của apiService
          const response = await apiService.getWithParam('/api/v1/management/payment/revenue', params, header);
          setRevenue(response.body);
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
        <label>Branch (Optional):</label>
        <select value={branchId} onChange={(e) => setBranchId(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>
              {branch.location}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Room type (Optional):</label>
        <select value={roomTypeId} onChange={(e) => setRoomTypeId(e.target.value)}>
          <option value="">Select room type</option>
          {roomTypes.map(roomType => (
            <option key={roomType.id} value={roomType.id}>
              {roomType.name}
            </option>
          ))}
        </select>
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