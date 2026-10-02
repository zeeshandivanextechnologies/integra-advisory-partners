const { body, param, validationResult } = require('express-validator');

const BLOCK_TYPES = ['p', 'h2', 'list'];

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

const validateId = [param('id').isInt({ min: 1 }).withMessage('Invalid article id'), handleErrors];

const validateArticle = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug')
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug can use lowercase letters, numbers, and single hyphens only'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('date').isISO8601({ strict: true }).withMessage('Date must be YYYY-MM-DD'),
  body('status').isIn(['draft', 'published']).withMessage('Status must be draft or published'),
  body('readTime').optional().isString(),
  body('excerpt').optional().isString(),
  body('url')
    .optional({ values: 'falsy' })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('External link must start with http:// or https://'),
  body('body')
    .optional()
    .custom((blocks) =>
      Array.isArray(blocks) &&
      blocks.every(
        (block) =>
          block &&
          BLOCK_TYPES.includes(block.type) &&
          (block.type === 'list'
            ? Array.isArray(block.items) && block.items.every((item) => typeof item === 'string')
            : typeof block.text === 'string')
      )
    )
    .withMessage('Article body is not valid'),
  handleErrors,
];

module.exports = {
  validateId,
  validateArticle,
};
