import React, { useState } from 'react';
import './Booking.css';

const rooms = [
  { id: 1, name: 'Room 101', type: 'Single', price: 100 },
  { id: 2, name: 'Room 102', type: 'Double', price: 150 },
  { id: 3, name: 'Room 201', type: 'Suite', price: 250 },
  { id: 4, name: 'Room 202', type: 'Single', price: 100 },
  { id: 5, name: 'Room 301', type: 'Double', price: 150 },
  { id: 6, name: 'Room 302', type: 'Double', price: 150 },
  { id: 1, name: 'Room 101', type: 'Single', price: 100 },
  { id: 2, name: 'Room 102', type: 'Double', price: 150 },
  { id: 3, name: 'Room 201', type: 'Suite', price: 250 },
  { id: 4, name: 'Room 202', type: 'Single', price: 100 },
  { id: 5, name: 'Room 301', type: 'Double', price: 150 },
  { id: 6, name: 'Room 302', type: 'Double', price: 150 },
  { id: 1, name: 'Room 101', type: 'Single', price: 100 },
  { id: 2, name: 'Room 102', type: 'Double', price: 150 },
  { id: 3, name: 'Room 201', type: 'Suite', price: 250 },
  { id: 4, name: 'Room 202', type: 'Single', price: 100 },
  { id: 5, name: 'Room 301', type: 'Double', price: 150 },
  { id: 6, name: 'Room 302', type: 'Double', price: 150 },
];

const Booking = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleViewDetails = (id) => {
    const room = rooms.find(room => room.id === id);
    setSelectedRoom(room);
    console.log("View details button clicked for room:", room);
  };

  return (
    <div className="booking-container">
      <div className="overlay"></div> {/* Thêm nền mờ */}
      <div className="booking-content">
        <h1>Hotel Room Management</h1>
        <div className="room-table">
          <table>
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>${room.price} per night</td>
                  <td>
                    <button className="details-button" onClick={() => handleViewDetails(room.id)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRoom && (
          <div className="room-details-overlay">
            <div className="room-details">
              <div className="image-container">
                <img
                  src={require(`../booking/PHONGVIP1.jpg`)}
                  alt={selectedRoom.name}
                  className="room-image-details"
                />
              </div>
              <table className="room-info-table">
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{selectedRoom.id}</td>
                  </tr>
                  <tr>
                    <td>CHECK IN:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>CHECK OUT:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>STATUS:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>ROOM ID:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>USER ID:</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => setSelectedRoom(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
