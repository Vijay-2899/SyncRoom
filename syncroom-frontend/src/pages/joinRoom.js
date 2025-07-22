import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './darkTheme.css';

function JoinRoom() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const res = await axios.get(`/rooms/code/${code}`);
      const room = res.data;
      navigate(`/room/${room.id}`);
    } catch (err) {
      alert(' Invalid Room Code');
    }
  };

  return (
    <div className="form-container">
      <h2>Join a Room</h2>
      <input type="text" placeholder="Enter Room Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export default JoinRoom;