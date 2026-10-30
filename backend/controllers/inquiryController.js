const db = require('../config/db');
const path = require('path');
const fs = require('fs');
const { sendContactNotificationEmail } = require('../services/emailService');

// Submit Contact Inquiry
const submitContact = async (req, res) => {
  try {
    const { name, email, company, role, inquiryType, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const query = `
      INSERT INTO inquiries (type, name, email, company, role, inquiry_type, message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'new')
      RETURNING *;
    `;
    const values = [
      'contact',
      name.trim(),
      email.trim(),
      (company || '').trim(),
      (role || '').trim(),
      (inquiryType || '').trim(),
      (message || '').trim(),
    ];

    const result = await db.query(query, values);
    const savedInquiry = result.rows[0];

    // Trigger email notification to client email (async, doesn't block response)
    sendContactNotificationEmail(savedInquiry).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully.',
      data: savedInquiry,
    });
  } catch (err) {
    console.error('submitContact error:', err);
    return res.status(500).json({ message: 'Failed to submit inquiry.' });
  }
};

// Submit Intake Form (handles multipart/form-data for multiple document/image attachments)
const submitIntake = async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      role,
      origin,
      sector,
      markets,
      budget,
      timeline,
      concern,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Collect all uploaded files (single or multiple) from multer
    let uploadedFilesList = [];
    if (req.files) {
      if (Array.isArray(req.files.documents)) {
        uploadedFilesList.push(...req.files.documents);
      }
      if (Array.isArray(req.files.document)) {
        uploadedFilesList.push(...req.files.document);
      }
    } else if (req.file) {
      uploadedFilesList.push(req.file);
    }

    let documentPath = '';
    if (uploadedFilesList.length > 0) {
      // Store paths comma-separated: e.g. "/uploads/file1.pdf, /uploads/file2.jpg"
      documentPath = uploadedFilesList.map((f) => `/uploads/${f.filename}`).join(', ');
    } else if (req.body.documents && typeof req.body.documents === 'string') {
      documentPath = req.body.documents;
    }

    const query = `
      INSERT INTO inquiries (
        type, name, email, company, role, origin, sector, markets, budget, documents, timeline, concern, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'new')
      RETURNING *;
    `;
    const values = [
      'intake',
      name.trim(),
      email.trim(),
      (company || '').trim(),
      (role || '').trim(),
      (origin || '').trim(),
      (sector || '').trim(),
      (markets || '').trim(),
      (budget || '').trim(),
      documentPath,
      (timeline || '').trim(),
      (concern || '').trim(),
    ];

    const result = await db.query(query, values);
    const savedInquiry = result.rows[0];

    // Store binary file data into PostgreSQL inquiry_attachments table
    // so downloads permanently work in serverless/Vercel environments
    if (uploadedFilesList.length > 0) {
      for (const file of uploadedFilesList) {
        try {
          let buffer = file.buffer;
          if (!buffer && file.path && fs.existsSync(file.path)) {
            buffer = fs.readFileSync(file.path);
          }
          if (buffer) {
            await db.query(
              `INSERT INTO inquiry_attachments (inquiry_id, filename, original_name, mime_type, file_size, file_data)
               VALUES ($1, $2, $3, $4, $5, $6)
               ON CONFLICT (filename) DO UPDATE SET file_data = EXCLUDED.file_data`,
              [
                savedInquiry.id,
                file.filename,
                file.originalname || file.filename,
                file.mimetype || 'application/octet-stream',
                file.size || buffer.length,
                buffer,
              ]
            );
          }
        } catch (fileSaveErr) {
          console.error('Failed to save file attachment to database:', fileSaveErr);
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Intake form submitted successfully.',
      data: savedInquiry,
    });
  } catch (err) {
    console.error('submitIntake error:', err);
    return res.status(500).json({ message: 'Failed to submit intake form.' });
  }
};

// Submit Event Registration Interest
const submitEventInterest = async (req, res) => {
  try {
    const { name, email, company, role, events, eventTitle, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Format events list or title
    const selectedEvents = Array.isArray(events) ? events.join(', ') : (events || '');
    const inquiryType = eventTitle ? `Event: ${eventTitle}` : 'Event Interest Registration';

    const query = `
      INSERT INTO inquiries (
        type, name, email, company, role, inquiry_type, sector, message, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new')
      RETURNING *;
    `;
    const values = [
      'event',
      name.trim(),
      email.trim(),
      (company || '').trim(),
      (role || '').trim(),
      inquiryType.trim(),
      selectedEvents.trim(), // Stored in sector/category column
      (message || '').trim(),
    ];

    const result = await db.query(query, values);
    const savedInquiry = result.rows[0];

    return res.status(201).json({
      success: true,
      message: 'Event interest registered successfully.',
      data: savedInquiry,
    });
  } catch (err) {
    console.error('submitEventInterest error:', err);
    return res.status(500).json({ message: 'Failed to submit event interest.' });
  }
};

// Admin: Get all inquiries with optional search & filter
const getInquiries = async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = 'SELECT * FROM inquiries';
    const conditions = [];
    const values = [];

    if (type) {
      values.push(type);
      conditions.push(`type = $${values.length}`);
    }
    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, values);
    return res.json({ success: true, inquiries: result.rows });
  } catch (err) {
    console.error('getInquiries error:', err);
    return res.status(500).json({ message: 'Failed to fetch inquiries.' });
  }
};

// Admin: Update inquiry status (e.g. 'new' -> 'contacted' -> 'archived')
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      'UPDATE inquiries SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inquiry not found.' });
    }

    return res.json({ success: true, inquiry: result.rows[0] });
  } catch (err) {
    console.error('updateInquiryStatus error:', err);
    return res.status(500).json({ message: 'Failed to update inquiry status.' });
  }
};

// Admin: Delete an inquiry
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM inquiries WHERE id = $1', [id]);
    return res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (err) {
    console.error('deleteInquiry error:', err);
    return res.status(500).json({ message: 'Failed to delete inquiry.' });
  }
};

module.exports = {
  submitContact,
  submitIntake,
  submitEventInterest,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
};

