const express = require('express');
const { list } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, list);

module.exports = router;
