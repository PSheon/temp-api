const { check } = require('express-validator')
const validator = require('validator')

const { validateResult } = require('../../../middleware/utils')

/**
 * Validates update User request
 */
const validateUpdateUser = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('displayName')
    .optional()
    .isLength({ min: 3, max: 12 })
    .withMessage('OUT_OF_RANGE'),
  check('phone')
    .optional()
    .custom((phone) =>
      validator.isMobilePhone(phone, ['zh-TW'], { strictMode: true })
    )
    .withMessage('WRONG_MOBILE_PHONE')
    .trim(),
  check('shortcuts')
    .optional()
    .isArray({ min: 1, max: 6 })
    .withMessage('MUST_HAVE_ONE_SHORTCUT_MAX_TO_SIX')
    .trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateUser }
