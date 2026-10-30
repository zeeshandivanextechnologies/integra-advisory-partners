const db = require('../config/db');

const createInquiryAttachmentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS inquiry_attachments (
      id SERIAL PRIMARY KEY,
      inquiry_id INTEGER REFERENCES inquiries(id) ON DELETE CASCADE,
      filename VARCHAR(255) NOT NULL UNIQUE,
      original_name VARCHAR(255) NOT NULL,
      mime_type VARCHAR(100),
      file_size BIGINT,
      file_data BYTEA NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

module.exports = {
  createInquiryAttachmentTable,
};
