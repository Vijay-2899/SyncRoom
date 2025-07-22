const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authMiddleware');

// Generate 6-character unique room code
const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create a room
router.post('/', authenticate, async (req, res) => {
  const { name } = req.body;
  const code = generateRoomCode();

  try {
    const [result] = await db.query(
      'INSERT INTO rooms (name, host_id, room_code) VALUES (?, ?, ?)',
      [name, req.user.id, code]
    );
    res.json({ message: 'Room created', roomId: result.insertId, code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Room creation failed' });
  }
});

// Add a song to a room's queue
router.post('/:roomId/queue', authenticate, async (req, res) => {
  const { songId } = req.body;
  const { roomId } = req.params;

  try {
    await db.query(
      'INSERT INTO queue_items (room_id, song_id, added_by) VALUES (?, ?, ?)',
      [roomId, songId, req.user.id]
    );
    res.json({ message: 'Song added to queue' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to queue' });
  }
});

// Get queue for a room
router.get('/:roomId/queue', async (req, res) => {
  const { roomId } = req.params;

  try {
    const [queue] = await db.query(`
      SELECT q.id, s.title, s.artist, s.file_path, u.username AS added_by
      FROM queue_items q
      JOIN songs s ON q.song_id = s.id
      LEFT JOIN users u ON q.added_by = u.id
      WHERE q.room_id = ?
      ORDER BY q.added_at ASC
    `, [roomId]);

    res.json({ queue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch queue' });
  }
});

// Join a room by room code (main join endpoint)
router.get('/code/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM rooms WHERE room_code = ?', [code]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join room' });
  }
});

// 🔍 Get room by ID
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [roomId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});





module.exports = router;
