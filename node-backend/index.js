require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Mount routes
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const roomRoutes = require('./routes/rooms');

app.use('/auth', authRoutes);
app.use('/songs', songRoutes);
app.use('/rooms', roomRoutes);

console.log("✅ All routes mounted.");

// Create server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`👥 User joined room ${roomId}`);
  });

  socket.on('play', (roomId) => {
    io.to(roomId).emit('play');
  });

  socket.on('pause', (roomId) => {
    io.to(roomId).emit('pause');
  });

  socket.on('skip', (roomId) => {
    io.to(roomId).emit('skip');
  });

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
