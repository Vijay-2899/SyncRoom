import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../components/Layout.css';

function Dashboard() {
  const [recentSongs, setRecentSongs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const userRes = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const songsRes = await axios.get('/songs/my-uploads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentSongs(songsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load user or songs', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container dark-theme">
      <h1 className="dashboard-heading">🎧 Welcome to SyncRoom</h1>
      {user && <h2 className="welcome-message">Hello, {user.username}!</h2>}

      <div className="recent-section">
        <h3> Recently Uploaded</h3>
        {recentSongs.length > 0 ? (
          <ul>
            {recentSongs.map((song) => (
              <li key={song.id}>{song.title} by {song.artist}</li>
            ))}
          </ul>
        ) : (
          <p>No recent uploads found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
