import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Upload from './pages/upload';
import CreateRoom from './pages/createRoom';
import JoinRoom from './pages/joinRoom';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/layout'; // ✅ Layout added

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes inside Spotify-like Layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Layout>
                <Upload />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create-room"
          element={
            <PrivateRoute>
              <Layout>
                <CreateRoom />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/join-room"
          element={
            <PrivateRoute>
              <Layout>
                <JoinRoom />
              </Layout>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
