const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const pageRoutes = require('./pages');
const uploadRoutes = require('./uploads');
const articleRoutes = require('./articles');
const eventRoutes = require('./events');
const dashboardRoutes = require('./dashboard');
const notificationRoutes = require('./notifications');
const subscriberRoutes = require('./subscribers');
const inquiryRoutes = require('./inquiries');

router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/uploads', uploadRoutes);
router.use('/articles', articleRoutes);
router.use('/events', eventRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/notifications', notificationRoutes);
router.use('/subscribers', subscriberRoutes);
router.use('/inquiries', inquiryRoutes);

module.exports = router;