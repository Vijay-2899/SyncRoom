const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');

// ➕ Add song to queue
router.post('/add', authenticateToken, (req, res) => {
  const { room_id, song_id } = req.body;
  const added_by = req.user.id;

  db.run(`
    INSERT INTO queue_items (room_id, song_id, added_by)
    VALUES (?, ?, ?)
  `, [room_id, song_id, added_by], function (err) {
    if (err) return res.status(500).json({ error: 'DB error while adding to queue' });
    res.json({ message: 'Song added to queue', queue_item_id: this.lastID });
  });
});

// 📄 Get queue for a room
router.get('/:room_id', authenticateToken, (req, res) => {
  const room_id = req.params.room_id;

  db.all(`
    SELECT qi.id, s.title, s.artist, s.file_path, u.username AS added_by
    FROM queue_items qi
    JOIN songs s ON qi.song_id = s.id
    JOIN users u ON qi.added_by = u.id
    WHERE qi.room_id = ?
    ORDER BY qi.added_at ASC
  `, [room_id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error while fetching queue' });
    res.json({ queue: rows });
  });
});

// 🗑️ Optional: Clear queue for a room
router.delete('/clear/:room_id', authenticateToken, (req, res) => {
  const room_id = req.params.room_id;
  db.run(`DELETE FROM queue_items WHERE room_id = ?`, [room_id], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to clear queue' });
    res.json({ message: 'Queue cleared' });
  });
});

module.exports = router;
