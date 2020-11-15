const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates update Commodity request
 */
const validateUpdateCommodity = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('insight')
    .optional()
    .isLength({ min: 10, max: 120 })
    .withMessage('OUT_OF_RANGE'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateCommodity }
