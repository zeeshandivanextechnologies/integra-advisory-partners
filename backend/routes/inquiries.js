const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const {
  submitContact,
  submitIntake,
  submitEventInterest,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');

const router = express.Router();

// Setup local uploads storage for intake documents & images
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    // Sanitize original file name
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const unique = `${cleanBase}_${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max per file
  fileFilter: (req, file, cb) => {
    // Allow all common documents, PDFs, presentations, spreadsheets, archives, and images (jpg, png, webp, etc.)
    cb(null, true);
  },
});

// Direct file download route (forces browser download attachment with correct content disposition)
router.get('/download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found on server.' });
  }

  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  return res.download(filePath, filename);
});

// Public submission endpoints
router.post('/contact', submitContact);
// Support multiple files (up to 10 files) under field names 'documents' or 'document'
router.post('/intake', upload.fields([{ name: 'documents', maxCount: 10 }, { name: 'document', maxCount: 10 }]), submitIntake);
router.post('/event', submitEventInterest);

// Admin-protected endpoints
router.get('/', authMiddleware, getInquiries);
router.patch('/:id/status', authMiddleware, updateInquiryStatus);
router.delete('/:id', authMiddleware, deleteInquiry);

module.exports = router;

