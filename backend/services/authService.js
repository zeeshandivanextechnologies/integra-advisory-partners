const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (adminId, email) => {
  return jwt.sign({ id: adminId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const login = async ({ email, password }) => {
  const result = await db.query('SELECT * FROM admins WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const admin = result.rows[0];
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const token = generateToken(admin.id, admin.email);
  const { password: _, ...adminWithoutPassword } = admin;

  return { admin: adminWithoutPassword, token };
};

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@integra.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  // Seed only an empty table. Checking by email would re-create the .env admin
  // (with the .env password) after the admin changes their email in Settings.
  const existing = await db.query('SELECT id FROM admins LIMIT 1');
  if (existing.rows.length > 0) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    'INSERT INTO admins (email, password, role) VALUES ($1, $2, $3)',
    [email, hashedPassword, 'admin']
  );
  console.log(`✅ Admin seeded: ${email}`);
};

module.exports = {
  login,
  seedAdmin,
  generateToken,
};