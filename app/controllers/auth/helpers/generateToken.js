const PROCESS_ENV = require('config')

const jwt = require('jsonwebtoken')

// const { encrypt } = require('../../../middleware/auth')

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user = '') => {
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) + 60 * PROCESS_ENV.JWT_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    // return auth.encrypt(
    //   jwt.sign(
    //     {
    //       data: {
    //         _id: user
    //       },
    //       exp: expiration
    //     },
    //     PROCESS_ENV.JWT_SECRET
    //   )
    // )
    // TODO 改為加密方式
    return jwt.sign(
      {
        data: {
          _id: user
        },
        exp: expiration
      },
      PROCESS_ENV.JWT_SECRET
    )
  } catch (error) {
    throw error
  }
}

module.exports = { generateToken }
