const express = require('express');
const { uploadFile, signUpload, ALLOWED_TYPES } = require('../controllers/uploadController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// the file is sent as the request body with its own Content-Type
router.post(
  '/',
  authMiddleware,
  express.raw({ type: Object.keys(ALLOWED_TYPES), limit: '50mb' }),
  uploadFile
);

// a one-time link for uploading straight to Supabase Storage (JSON body)
router.post('/sign', authMiddleware, signUpload);

module.exports = router;
