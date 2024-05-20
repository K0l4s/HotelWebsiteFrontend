import React, { useState } from 'react';
import './User.css';

const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 1' },
    { id: 3, name: 'User 1' },
    { id: 4, name: 'User 1' },
    { id: 5, name: 'User 1' },
    { id: 6, name: 'User 1' },
    { id: 7, name: 'User 1' },
    { id: 8, name: 'User 1' },
    { id: 9, name: 'User 1' },
];

const User = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="user-container">
            <div className="user-content">
                <h1>USER MANAGEMENT</h1>
                <div className="user-list">
                    {users.map((user) => (
                        <div key={user.id} className="user-card">
                            <div className="image-container">
                                <img
                                    src={require(`./PHONGVIP1.jpg`)}
                                    alt={user.name}
                                    className="user-image"
                                />
                            </div>
                            <h2>{user.name}</h2>
                            {/* <p>Type: {user.type}</p> */}
                            {/* <p>Price: ${user.price} per night</p> */}
                            <button onClick={() => handleViewDetails(user)}>View Details</button>
                        </div>
                    ))}
                </div>
                {selectedUser && (
                    <div className="user-details-overlay">
                        <div className="user-details">
                            <div className="image-container">
                                <img
                                    src={require(`./PHONGVIP1.jpg`)}
                                    alt={selectedUser.name}
                                    className="user-image-details"
                                />
                            </div>
                            <p>ID: </p>
                            <p>FullName: </p>
                            <p>Birthday: </p>
                            <p>Address: </p>
                            <p>Phone: </p>
                            <p>Email: </p>
                            <p>Code: </p>
                            <p>Role: </p>
                            <button onClick={() => setSelectedUser(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
