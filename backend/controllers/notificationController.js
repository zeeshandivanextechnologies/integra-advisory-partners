const { getNotifications } = require('../services/notificationService');

// Admin only. ?limit= (default 10, at most 50)
const list = async (req, res, next) => {
  try {
    const requested = Number.parseInt(req.query.limit, 10);
    const limit = Number.isNaN(requested) ? 10 : Math.min(Math.max(requested, 1), 50);
    const notifications = await getNotifications(limit);
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  list,
};
