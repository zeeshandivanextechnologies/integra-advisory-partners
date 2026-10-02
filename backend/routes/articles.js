const express = require('express');
const controller = require('../controllers/articleController');
const { validateId, validateArticle } = require('../validators/articleValidator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// admin (declared before /:slug so "admin" is not read as a slug)
router.get('/admin/all', authMiddleware, controller.listAll);
router.get('/admin/:id', authMiddleware, validateId, controller.getOne);
router.post('/admin', authMiddleware, validateArticle, controller.create);
router.put('/admin/:id', authMiddleware, validateId, validateArticle, controller.update);
router.delete('/admin/:id', authMiddleware, validateId, controller.remove);

// public: published articles only
router.get('/', controller.listPublished);
router.get('/:slug', controller.getPublished);

module.exports = router;
