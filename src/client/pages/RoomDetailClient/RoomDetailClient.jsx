import React from 'react'
import './RoomDetailClient.css'
import { useParams } from 'react-router-dom';
const RoomDetailClient = () => {
    const id = useParams().id;
  return (
    <div>
        <h1>Room Detail</h1>
        <p>Room id: {id}</p>
        
    </div>
  )
}

export default RoomDetailClient