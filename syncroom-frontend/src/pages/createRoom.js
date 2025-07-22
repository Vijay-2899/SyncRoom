import React, { useState } from 'react';
import axios from '../axios';
import './darkTheme.css';

function CreateRoom() {
  const [name, setName] = useState('');
  const [created, setCreated] = useState(null);

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/rooms', { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreated(res.data);
    } catch (err) {
      alert(' Room creation failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Room Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
      {created && (
        <div style={{ marginTop: '1rem' }}>
          <p> Room Created</p>
          <p><strong>Room Name:</strong> {created.name}</p>
          <p><strong>Room Code:</strong> {created.code}</p>
        </div>
      )}
    </div>
  );
}

export default CreateRoom;