const express = require('express');
const controller = require('../controllers/eventController');
const { validateId, validateEvent } = require('../validators/eventValidator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// admin
router.get('/admin/all', authMiddleware, controller.listAll);
router.get('/admin/:id', authMiddleware, validateId, controller.getOne);
router.post('/admin', authMiddleware, validateEvent, controller.create);
router.put('/admin/:id', authMiddleware, validateId, validateEvent, controller.update);
router.delete('/admin/:id', authMiddleware, validateId, controller.remove);

// public: published events only
router.get('/', controller.listPublished);

module.exports = router;
