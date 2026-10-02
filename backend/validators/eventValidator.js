const { body, param, validationResult } = require('express-validator');

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

const validateId = [param('id').isInt({ min: 1 }).withMessage('Invalid event id'), handleErrors];

const validateEvent = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('format').trim().notEmpty().withMessage('Format is required'),
  body('date').isISO8601({ strict: true }).withMessage('Date must be YYYY-MM-DD'),
  body('status').isIn(['draft', 'published']).withMessage('Status must be draft or published'),
  body('time').optional().isString(),
  body('location').optional().isString(),
  body('mode').optional().isString(),
  body('registerUrl')
    .optional({ values: 'falsy' })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Registration link must start with http:// or https://'),
  handleErrors,
];

module.exports = {
  validateId,
  validateEvent,
};
