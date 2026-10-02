const { body, validationResult } = require('express-validator');

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

const validateProfile = [
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name can be up to 100 characters'),
  // kept exactly as typed (only trimmed) because login matches the email exactly
  body('email').trim().isEmail().withMessage('Enter a valid email address'),
  handleErrors,
];

const validatePasswordChange = [
  body('currentPassword').notEmpty().withMessage('Enter your current password'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('The new password needs at least 8 characters'),
  handleErrors,
];

module.exports = {
  validateProfile,
  validatePasswordChange,
};
