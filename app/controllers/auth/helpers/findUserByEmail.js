const { itemNotFound } = require('../../../middleware/utils')
const User = require('../../../models/user')

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUserByEmail = (email = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email
      },
      'password loginAttempts blockExpires displayName memberId email role verified verification',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findUserByEmail }
