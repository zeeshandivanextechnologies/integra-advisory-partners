const { getDashboard } = require('../services/dashboardService');

// Admin only: counts and recent activity for the admin dashboard
const getSummary = async (req, res, next) => {
  try {
    const summary = await getDashboard();
    res.status(200).json({ success: true, ...summary });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSummary,
};
