const PROCESS_ENV = require('config')

const jwt = require('jsonwebtoken')

// const { decrypt } = require('../../../middleware/auth')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 */
const getUserIdFromToken = (token = '') => {
  return new Promise((resolve, reject) => {
    // Decrypts, verifies and decode token
    // @ANCHOR
    // jwt.verify(decrypt(token), PROCESS_ENV.JWT_SECRET, (err, decoded) => {
    jwt.verify(token, PROCESS_ENV.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(buildErrObject(409, 'BAD_TOKEN'))
      }
      resolve(decoded.data._id)
    })
  })
}

module.exports = { getUserIdFromToken }
