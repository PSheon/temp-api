const { itemNotFound } = require('../../../middleware/utils')
const User = require('../../../models/user')

/**
 * Finds user by user's id
 * @param {string} _id - user id
 */
const findUserById = (_id = '') => {
  return new Promise((resolve, reject) => {
    User.findById(_id, 'password email', async (err, user) => {
      try {
        await itemNotFound(err, user, 'USER_DOES_NOT_EXIST')
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { findUserById }
