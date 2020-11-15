const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates Update User's password request
 */
const validateUpdatePassword = [
  check('oldPassword')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 8
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_8'),
  check('newPassword')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 8
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_8'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdatePassword }
