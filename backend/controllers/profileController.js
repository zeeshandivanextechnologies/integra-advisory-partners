const profileService = require('../services/profileService');

const updateProfile = async (req, res, next) => {
  try {
    const admin = await profileService.updateProfile(req.admin.id, {
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).json({ success: true, message: 'Profile saved', admin });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    await profileService.changePassword(req.admin.id, {
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    });
    res.status(200).json({ success: true, message: 'Password changed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateProfile,
  changePassword,
};
