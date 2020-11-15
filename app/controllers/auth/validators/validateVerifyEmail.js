const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates verify email request
 */
const validateVerifyEmail = [
  check('verification')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateVerifyEmail }
