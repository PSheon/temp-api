const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates Request new refresh token request
 */
const validateGetRefreshToken = [
  check('token')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateGetRefreshToken }
