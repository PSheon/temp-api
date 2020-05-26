const { validationResult } = require('../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
  check('memberId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 8
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_8'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['trial', 'user', 'staff', 'admin'])
    .withMessage('USER_NOT_IN_KNOWN_ROLE'),
  check('phone')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .custom((phone) =>
      validator.isMobilePhone(phone, ['zh-TW'], { strictMode: true })
    )
    .withMessage('WRONG_MOBILE_PHONE')
    .trim(),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
exports.updateItem = [
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
    validationResult(req, res, next)
  }
]

/**
 * Validates get item request
 */
exports.getItem = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates delete item request
 */
exports.deleteItem = [
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
