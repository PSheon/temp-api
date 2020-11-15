const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates update Access request
 */
const validateUpdateAccess = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('hightlight').optional().isBoolean().withMessage('NOT_BOOLEAN'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateAccess }
