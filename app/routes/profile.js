const controller = require('../controllers/profile')
const validate = require('../controllers/profile/validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const avatarUploader = require('../middleware/multer/avatar')
const router = express.Router()
require('../../utils/setup/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Profile routes
 */

/*
 * Get Profiles route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
  trimRequest.all,
  controller.getItem
)

/*
 * Update profile route
 */
router.patch(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
  trimRequest.all,
  validate.updateProfile,
  controller.updateProfile
)

router.post(
  '/me/avatar',
  requireAuth,
  AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
  avatarUploader.single('avatarData'),
  validate.processAvatar,
  controller.processAvatar
)

/*
 * Change password route
 */
router.post(
  '/change-password',
  requireAuth,
  AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
  trimRequest.all,
  validate.changePassword,
  controller.changePassword
)

/*
 * Update user avatar
 */
// router.put(
//   '/avatar',
//   requireAuth,
//   AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
//   trimRequest.all,
//   uploader.single('avatarImage'),
//   controller.updateAvatar
// )

/*
 * User's access history routes
 */
// router.post(
//   '/access-history',
//   requireAuth,
//   AuthController.roleAuthorization(['trial', 'user', 'staff', 'admin']),
//   trimRequest.all,
//   controller.getAccesses
// )

module.exports = router
