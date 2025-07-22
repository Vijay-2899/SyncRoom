const db = require('./config/db');
const bcrypt = require('bcryptjs');

const emailToReset = 'test@example.com';
const newPassword = '123456';

bcrypt.hash(newPassword, 10, (err, hashed) => {
  if (err) return console.error(err);

  db.run(
    `UPDATE users SET password = ? WHERE email = ?`,
    [hashed, emailToReset],
    function (err) {
      if (err) return console.error('❌ Error updating password:', err.message);
      console.log(`✅ Password updated for ${emailToReset}`);
    }
  );
});
