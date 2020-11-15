const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const { roleAuthorization } = require('../controllers/auth')
const {
  getCommodity,
  getCommodities,
  createCommodity,
  updateCommodity,
  deleteCommodity
} = require('../controllers/commodities')
const {
  validateGetCommodity,
  validateCreateCommodity,
  validateUpdateCommodity,
  validateDeleteCommodity
} = require('../controllers/commodities/validators')
require('../../utils/setup/passport')

const router = express.Router()

/*
 * Commodities routes
 */

/*
 * Get Commodity route
 */
router.get(
  '/:_id',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validateGetCommodity,
  getCommodity
)

/*
 * Get Commodities route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  getCommodities
)

/*
 * Create new Commodity route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validateCreateCommodity,
  createCommodity
)

/*
 * Update Commodity route
 */
router.patch(
  '/:_id',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validateUpdateCommodity,
  updateCommodity
)

/*
 * Delete Commodity route
 */
router.delete(
  '/:_id',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validateDeleteCommodity,
  deleteCommodity
)

module.exports = router
