const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')

const controller = require('../controllers/apps')
const validate = require('../controllers/apps/validate')
const AuthController = require('../controllers/auth')

const router = express.Router()
require('../../utils/setup/passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

/*
 * APPs - process manager routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  controller.getAllItems
)

/*
 * Create new item route
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
 * Get item route
 */
router.get(
  '/:appId',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.getItem,
  controller.getItem
)

/*
 * Get item logs route
 */
router.get(
  '/:appId/:instanceId/logs',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.getItemLogs,
  controller.getItemLogs
)

/*
 * Update item route
 * Manage process status. start, restart, reload...etc
 */
router.patch(
  '/:appId',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
)

/*
 * Delete item route
 */
// router.delete(
//   '/:id',
//   requireAuth,
//   AuthController.roleAuthorization(['admin']),
//   trimRequest.all,
//   validate.deleteItem,
//   controller.deleteItem
// )

module.exports = router
