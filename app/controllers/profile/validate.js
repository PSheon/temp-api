const { validationResult } = require('../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
exports.updateProfile = [
  check('displayName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('photoURL').optional().not().isEmpty().withMessage('IS_EMPTY').trim(),
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
    validationResult(req, res, next)
  }
]

/**
 * Validates change password request
 */
exports.changePassword = [
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
    validationResult(req, res, next)
  }
]
