const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates get User request
 */
const validateGetUser = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateGetUser }
