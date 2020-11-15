const { itemNotFound } = require('../../../middleware/utils')
const User = require('../../../models/user')

/**
 * Checks if verification id exists for user
 * @param {string} verification - verification id
 */
const verificationExists = (verification = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        verification,
        verified: false
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND_OR_ALREADY_VERIFIED')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { verificationExists }
