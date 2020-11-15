const User = require('../../models/user')
const { buildErrObject } = require('../utils')

/**
 * Checks User model if user with an specific email exists but excluding user id
 * @param {string} _id - user id
 * @param {string} email - user email
 */
const emailExistsExcludingMyself = (_id = '', email = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        email,
        _id: {
          $ne: _id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'EMAIL_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { emailExistsExcludingMyself }
