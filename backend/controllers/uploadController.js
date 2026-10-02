const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

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

// Admin only. The file arrives as the raw request body (see routes/uploads.js).
// Returns a path like /uploads/abc.webp that the admin stores in page content.
const uploadFile = async (req, res, next) => {
  try {
    const contentType = (req.get('Content-Type') || '').split(';')[0].trim();
    const extension = ALLOWED_TYPES[contentType];

    if (!extension) {
      return res.status(400).json({
        message: 'Only JPG, PNG, WebP, GIF, MP4, and WebM files can be uploaded',
      });
    }

    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: 'The file is empty' });
    }

    const fileName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${extension}`;
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, fileName), req.body);

    res.status(201).json({
      success: true,
      message: 'File uploaded',
      url: `/uploads/${fileName}`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  UPLOAD_DIR,
  ALLOWED_TYPES,
  uploadFile,
};
