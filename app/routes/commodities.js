const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')

const AuthController = require('../controllers/auth')
const controller = require('../controllers/commodities')
const validate = require('../controllers/commodities/validate')

const router = express.Router()
require('../../utils/setup/passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

/*
 * Commodities routes
 */

/*
 * Get Commodity route
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
 * Get Commodities route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  controller.getItems
)

/*
 * Create new Commodity route
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.createItem,
  controller.createItem
)

/*
 * Update Commodity route
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
 * Delete Commodity route
 */
router.delete(
  '/:_id',
  requireAuth,
  AuthController.roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
