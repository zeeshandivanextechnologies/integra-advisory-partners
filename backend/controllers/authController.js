const { login } = require('../services/authService');

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

module.exports = {
  loginAdmin,
  getProfile,
};