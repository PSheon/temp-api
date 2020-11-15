const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  getAccess,
  getAccesses,
  updateAccess,
  deleteAccess
} = require('../controllers/accesses')
const {
  validateGetAccess,
  validateUpdateAccess,
  validateDeleteAccess
} = require('../controllers/accesses/validators')
const { roleAuthorization } = require('../controllers/auth')
require('../../utils/setup/passport')

const router = express.Router()

/*
 * Accesses routes
 */

/*
 * Get Access route
 */
router.get(
  '/:_id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetAccess,
  getAccess
)

/*
 * Get Accesses route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  getAccesses
)

/*
 * Update Access route
 */
router.patch(
  '/:_id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateAccess,
  updateAccess
)

/*
 * Delete Access route
 */
router.delete(
  '/:_id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteAccess,
  deleteAccess
)

module.exports = router
