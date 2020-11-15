const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const { roleAuthorization } = require('../controllers/auth')
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserPasswordOnself
} = require('../controllers/users')
const {
  validateGetUser,
  validateUpdateUser,
  validateUpdateUserRole,
  validateDeleteUser,
  validateUpdatePassword
} = require('../controllers/users/validators')
require('../../utils/setup/passport')

const router = express.Router()

/*
 * Users routes
 */

/*
 * Get User route
 */
router.get(
  '/:_id',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validateGetUser,
  getUser
)

/*
 * Get Users route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  getUsers
)

/*
 * Create new User route
 */
// router.post(
//   '/',
//   requireAuth,
//   roleAuthorization(['admin']),
//   trimRequest.all,
//   validateCreateUser,
//   createUser
// )

/*
 * Update User route
 */
router.patch(
  '/:_id',
  requireAuth,
  roleAuthorization(['staff', 'admin']),
  trimRequest.all,
  validateUpdateUser,
  updateUser
)

/*
 * Update User's role route
 */
router.patch(
  '/:_id/role',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateUserRole,
  updateUser
)

/*
 * Update onself password route
 */
router.patch(
  '/me/password',
  requireAuth,
  roleAuthorization(['user', 'staff', 'admin']),
  trimRequest.all,
  validateUpdatePassword,
  updateUserPasswordOnself
)

/*
 * Delete User route
 */
router.delete(
  '/:_id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteUser,
  deleteUser
)

module.exports = router
