const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')

const controller = require('../controllers/accesses')
const validate = require('../controllers/accesses/validate')
const AuthController = require('../controllers/auth')

const router = express.Router()
require('../../utils/setup/passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

/*
 * Accesses routes
 */

/*
 * Get Access route
 */
router.get(
  '/:_id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.getItem,
  controller.getItem
)

/*
 * Get Accesses route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  controller.getItems
)

/*
 * Create new Access route
 */
// router.post(
//   '/',
//   requireAuth,
//   AuthController.roleAuthorization(['admin']),
//   trimRequest.all,
//   validate.createItem,
//   controller.createItem
// )

/*
 * Update Access route
 */
router.patch(
  '/:_id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
)

/*
 * Delete Access route
 */
router.delete(
  '/:_id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
