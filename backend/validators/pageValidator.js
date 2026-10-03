const { body, param, validationResult } = require('express-validator');

// website pages that can be edited from the admin
// 'settings' holds site-wide links and contact details rather than a page
const PAGE_SLUGS = [
  'home',
  'about',
  'services',
  'packages',
  'process',
  'insights',
  'events',
  'deposit',
  'payment-success',
  'settings',
  'privacy-policy',
  'terms-and-conditions',
];

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
};

const validateSlug = [
  param('slug').isIn(PAGE_SLUGS).withMessage('Unknown page'),
  handleErrors,
];

const validatePageContent = [
  param('slug').isIn(PAGE_SLUGS).withMessage('Unknown page'),
  body('content')
    .custom((value) => value !== null && typeof value === 'object' && !Array.isArray(value))
    .withMessage('content must be an object'),
  handleErrors,
];

module.exports = {
  PAGE_SLUGS,
  validateSlug,
  validatePageContent,
};
