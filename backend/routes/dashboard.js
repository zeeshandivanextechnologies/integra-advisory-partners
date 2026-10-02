const express = require('express');
const { getSummary } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getSummary);

module.exports = router;
