const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// =====================================
// POST /songs/upload
// =====================================
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  const { title, artist } = req.body;
  const filePath = req.file?.path.replace(/\\/g, '/');
  const userId = req.user.id;

  if (!title || !req.file) {
    return res.status(400).json({ error: 'Title and song file are required.' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO songs (user_id, title, artist, file_path) VALUES (?, ?, ?, ?)`,
      [userId, title, artist || '', filePath]
    );

    res.status(201).json({
      message: '✅ Song uploaded successfully',
      songId: result.insertId,
      filePath,
    });
  } catch (err) {
    console.error('❌ DB Insert Error:', err.message);
    res.status(500).json({ error: 'Failed to upload song' });
  }
});

// =====================================
// GET /songs (All songs)
// =====================================
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM songs');
    res.json(rows);
  } catch (err) {
    console.error('❌ DB Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

module.exports = router;
