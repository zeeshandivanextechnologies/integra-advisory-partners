const express = require('express');
const controller = require('../controllers/subscriberController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public: Subscribe email
router.post('/subscribe', controller.subscribe);

// Admin: View all subscribers and manage
router.get('/admin/all', authMiddleware, controller.listAll);
router.delete('/admin/:id', authMiddleware, controller.remove);

module.exports = router;
