import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">🎧 SyncRoom</h2>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/create-room">Create Room</Link>
          <Link to="/join-room">Join Room</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
