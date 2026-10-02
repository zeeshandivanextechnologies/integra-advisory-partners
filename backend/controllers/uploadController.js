const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const storage = require('../services/storageService');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// content type -> file extension; SVG is left out because it can carry scripts
const ALLOWED_TYPES = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
};

const TYPE_ERROR = 'Only JPG, PNG, WebP, GIF, MP4, and WebM files can be uploaded';

const newFileName = (extension) =>
  `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${extension}`;

// Admin only. The file arrives as the raw request body (see routes/uploads.js).
// Returns the address the admin stores in page content: a Supabase Storage
// link when storage is set up, otherwise a path like /uploads/abc.webp.
const uploadFile = async (req, res, next) => {
  try {
    const contentType = (req.get('Content-Type') || '').split(';')[0].trim();
    const extension = ALLOWED_TYPES[contentType];

    if (!extension) {
      return res.status(400).json({ message: TYPE_ERROR });
    }

    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: 'The file is empty' });
    }

    const fileName = newFileName(extension);
    let url;

    if (storage.isConfigured()) {
      url = await storage.uploadBuffer(fileName, req.body, contentType);
    } else {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOAD_DIR, fileName), req.body);
      url = `/uploads/${fileName}`;
    }

    res.status(201).json({
      success: true,
      message: 'File uploaded',
      url,
    });
  } catch (err) {
    next(err);
  }
};

// Admin only. Body: { contentType, size }.
// With Supabase Storage set up, returns a one-time link the admin uploads the
// file to directly ({ mode: 'direct', uploadUrl, url }). Without it, tells the
// admin to send the file to POST /api/uploads as before ({ mode: 'server' }).
const signUpload = async (req, res, next) => {
  try {
    const contentType = String(req.body?.contentType || '').split(';')[0].trim();
    const extension = ALLOWED_TYPES[contentType];
    const size = Number(req.body?.size) || 0;

    if (!extension) {
      return res.status(400).json({ message: TYPE_ERROR });
    }

    if (size > storage.MAX_FILE_SIZE) {
      return res.status(400).json({ message: 'This file is too large. The limit is 50 MB.' });
    }

    if (!storage.isConfigured()) {
      return res.status(200).json({ success: true, mode: 'server' });
    }

    const signed = await storage.createSignedUpload(newFileName(extension));
    res.status(200).json({ success: true, mode: 'direct', ...signed });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  UPLOAD_DIR,
  ALLOWED_TYPES,
  uploadFile,
  signUpload,
};
