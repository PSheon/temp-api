const {
  itemNotFound,
  buildErrObject,
  buildSuccObject
} = require('../../../middleware/utils')
const User = require('../../../models/user')

/**
 * Update password in database
 * @param {string} _id - user id
 * @param {Object} req - request object
 */
const updatePasswordInDB = (_id = '', req = {}) => {
  return new Promise((resolve, reject) => {
    User.findById(_id, '+password', async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND')

        // Assigns new password to user
        user.password = req.newPassword

        // Saves in DB
        user.save((error) => {
          if (err) {
            return reject(buildErrObject(422, error.message))
          }
          resolve(buildSuccObject('PASSWORD_UPDATED'))
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { updatePasswordInDB }
