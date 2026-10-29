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

// Setup local uploads storage for intake documents
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max document size
});

// Public submission endpoints
router.post('/contact', submitContact);
router.post('/intake', upload.single('document'), submitIntake);
router.post('/event', submitEventInterest);

// Admin-protected endpoints
router.get('/', authMiddleware, getInquiries);
router.patch('/:id/status', authMiddleware, updateInquiryStatus);
router.delete('/:id', authMiddleware, deleteInquiry);

module.exports = router;

