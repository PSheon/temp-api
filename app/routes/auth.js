const controller = require('../controllers/auth')
const validate = require('../controllers/auth/validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../utils/setup/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Auth routes
 */

/*
 * Login route
 */
router.post('/login', trimRequest.all, validate.login, controller.login)

/*
 * Register route
 */
router.post(
  '/register',
  trimRequest.all,
  validate.register,
  controller.register
)

/*
 * Verify route
 */
router.post('/verify', trimRequest.all, validate.verify, controller.verify)

/*
 * Forgot password route
 */
router.post(
  '/forgot-password',
  trimRequest.all,
  validate.forgotPassword,
  controller.forgotPassword
)

/*
 * Reset password route
 */
router.post(
  '/reset-password',
  trimRequest.all,
  validate.resetPassword,
  controller.resetPassword
)

/*
 * Patch role route
 */
router.patch(
  '/role',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.patchRole,
  controller.patchRole
)

/*
 * Get new refresh token
 */
router.post(
  '/access-token',
  requireAuth,
  AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
  trimRequest.all,
  validate.getRefreshToken,
  controller.getRefreshToken
)

/*
 * Logout
 */
router.post(
  '/logout',
  requireAuth,
  AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
  trimRequest.all,
  controller.logout
)

module.exports = router
