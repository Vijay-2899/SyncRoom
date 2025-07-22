const db = require('./config/db');

db.all(`SELECT id, username, email FROM users`, [], (err, rows) => {
  if (err) {
    console.error('❌ Error fetching users:', err.message);
  } else {
    console.log('📋 Registered Users:');
    console.table(rows);
  }
});
