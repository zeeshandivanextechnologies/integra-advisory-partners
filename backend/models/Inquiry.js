const db = require('../config/db');

// Inquiries from Contact form and Intake form
const createInquiryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL DEFAULT 'contact', -- 'contact' or 'intake'
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255) DEFAULT '',
      role VARCHAR(255) DEFAULT '',
      inquiry_type VARCHAR(100) DEFAULT '',
      message TEXT DEFAULT '',
      origin VARCHAR(255) DEFAULT '',
      sector VARCHAR(255) DEFAULT '',
      markets VARCHAR(255) DEFAULT '',
      budget VARCHAR(255) DEFAULT '',
      documents TEXT DEFAULT '', -- uploaded file path or note
      timeline VARCHAR(255) DEFAULT '',
      concern TEXT DEFAULT '',
      status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'archived'
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
  await db.query('ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY');
};

module.exports = {
  createInquiryTable,
};

