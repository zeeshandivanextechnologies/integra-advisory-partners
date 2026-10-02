const express = require('express');
const { loginAdmin, getProfile } = require('../controllers/authController');
const { updateProfile, changePassword } = require('../controllers/profileController');
const { validateLogin } = require('../validators/authValidator');
const { validateProfile, validatePasswordChange } = require('../validators/profileValidator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/login', validateLogin, loginAdmin);
router.get('/me', authMiddleware, getProfile);

// the signed-in admin's own profile
router.put('/me', authMiddleware, validateProfile, updateProfile);
router.put('/me/password', authMiddleware, validatePasswordChange, changePassword);

module.exports = router;
