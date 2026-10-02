const express = require('express');
const { getPageContent, updatePageContent } = require('../controllers/pageController');
const { validateSlug, validatePageContent } = require('../validators/pageValidator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/:slug', validateSlug, getPageContent);
router.put('/:slug', authMiddleware, validatePageContent, updatePageContent);

module.exports = router;
