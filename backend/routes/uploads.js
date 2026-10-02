const express = require('express');
const { uploadFile, ALLOWED_TYPES } = require('../controllers/uploadController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// the file is sent as the request body with its own Content-Type
router.post(
  '/',
  authMiddleware,
  express.raw({ type: Object.keys(ALLOWED_TYPES), limit: '50mb' }),
  uploadFile
);

module.exports = router;
