const { itemNotFound } = require('../../../middleware/utils')
const ForgotPassword = require('../../../models/forgotPassword')

/**
 * Checks if a forgot password verification exists
 * @param {string} verification - verification id
 */
const findForgotPassword = (verification = '') => {
  return new Promise((resolve, reject) => {
    ForgotPassword.findOne(
      {
        verification,
        used: false
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND_OR_ALREADY_USED')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findForgotPassword }
