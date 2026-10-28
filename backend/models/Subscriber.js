const db = require('../config/db');

const createSubscriberTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
  await db.query('ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY');
};

module.exports = {
  createSubscriberTable,
};
