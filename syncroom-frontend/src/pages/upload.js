import React, { useState } from 'react';
import axios from '../axios';
import './darkTheme.css';

function Upload() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('file', file);

    try {
      await axios.post('/songs/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Uploaded successfully');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Song</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} required />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;