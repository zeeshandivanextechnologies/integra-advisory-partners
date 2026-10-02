const db = require('../config/db');
const bcrypt = require('bcryptjs');

const PUBLIC_COLUMNS = 'id, name, email, role, created_at';

// the signed-in admin's own name and login email
const updateProfile = async (adminId, { name, email }) => {
  try {
    const result = await db.query(
      `UPDATE admins SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING ${PUBLIC_COLUMNS}`,
      [name || '', email, adminId]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === '23505') {
      const error = new Error('Another admin already uses this email');
      error.status = 409;
      throw error;
    }
    throw err;
  }
};

const changePassword = async (adminId, { currentPassword, newPassword }) => {
  const result = await db.query('SELECT password FROM admins WHERE id = $1', [adminId]);
  const isMatch = await bcrypt.compare(currentPassword, result.rows[0].password);
  if (!isMatch) {
    const error = new Error('Current password is incorrect');
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.query(
    'UPDATE admins SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
    [hashedPassword, adminId]
  );
};

module.exports = {
  updateProfile,
  changePassword,
};
