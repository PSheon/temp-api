const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  roleAuthorization,
  logout
} = require('../controllers/auth')
const {
  validateRegister,
  validateVerifyEmail,
  validateGetRefreshToken,
  validateForgotPassword,
  validateResetPassword,
  validateLogin
} = require('../controllers/auth/validators')
require('../../utils/setup/passport')

const router = express.Router()

/*
 * Auth routes
 */

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

/*
 * Get new refresh token
 */
router.post(
  '/access-token',
  requireAuth,
  roleAuthorization(['user', 'staff', 'admin']),
  trimRequest.all,
  validateGetRefreshToken,
  getRefreshToken
)

/*
 * Register route
 */
router.post('/register', trimRequest.all, validateRegister, register)

/*
 * Verify route
 */
router.post('/verify-email', trimRequest.all, validateVerifyEmail, verifyEmail)

/*
 * Forgot password route
 */
router.post(
  '/forgot-password',
  trimRequest.all,
  validateForgotPassword,
  forgotPassword
)

/*
 * Reset password route
 */
router.post(
  '/reset-password',
  trimRequest.all,
  validateResetPassword,
  resetPassword
)

/*
 * Logout
 */
router.post(
  '/logout',
  requireAuth,
  roleAuthorization(['user', 'staff', 'admin']),
  trimRequest.all,
  logout
)

module.exports = router
