const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates Create commodity request
 */
const validateCreateCommodity = [
  check('displayName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('codeName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('insight').optional().trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateCommodity }
