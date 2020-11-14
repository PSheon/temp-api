const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')

const AuthController = require('../controllers/auth')
const controller = require('../controllers/users')
const validate = require('../controllers/users/validate')

const router = express.Router()
require('../../utils/setup/passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

/*
 * Users routes
 */

/*
 * Get User route
 */
router.get(
  '/:_id',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.getItem,
  controller.getItem
)

/*
 * Get Users route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  controller.getItems
)

/*
 * Create new User route
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
 * Update User route
 */
router.patch(
  '/:_id',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
)

/*
 * Delete User route
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
