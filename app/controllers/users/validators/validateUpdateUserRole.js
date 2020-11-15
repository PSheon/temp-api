const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates update User's role request
 */
const validateUpdateUserRole = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['user', 'staff', 'admin'])
    .withMessage('NOT_VALID_ROLE'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateUserRole }
