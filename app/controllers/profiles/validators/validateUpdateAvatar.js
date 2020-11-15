const { check } = require('express-validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates Update avatar request
 */
const validateUpdateAvatar = [
  check('avatarName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateAvatar }
