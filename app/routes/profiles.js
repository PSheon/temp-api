const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const { roleAuthorization } = require('../controllers/auth')
const { updateAvatar } = require('../controllers/profiles')
const { validateUpdateAvatar } = require('../controllers/profiles/validators')
const { avatarUploader } = require('../middleware/multer')
require('../../utils/setup/passport')

const router = express.Router()

/*
 * Profile routes
 */

/*
 * Get Profiles route
 */
// router.get(
//   '/',
//   requireAuth,
//   roleAuthorization(['user', 'staff', 'admin']),
//   trimRequest.all,
//   controller.getItem
// )

/*
 * Update profile route
 */
// router.patch(
//   '/',
//   requireAuth,
//   roleAuthorization(['user', 'staff', 'admin']),
//   trimRequest.all,
//   validate.updateProfile,
//   controller.updateProfile
// )

/*
 * Update onself avatar
 */
router.patch(
  '/me/avatar',
  requireAuth,
  roleAuthorization(['user', 'staff', 'admin']),
  avatarUploader.single('avatarData'),
  trimRequest.all,
  validateUpdateAvatar,
  updateAvatar
)

/*
 * User's access history routes
 */
// router.post(
//   '/access-history',
//   requireAuth,
//   roleAuthorization(['user', 'staff', 'admin']),
//   trimRequest.all,
//   controller.getAccesses
// )

module.exports = router
