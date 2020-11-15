const { itemNotFound } = require('../../../middleware/utils')
const User = require('../../../models/user')

/**
 * Finds user by ID
 * @param {string} _id - user´s id
 */
const findUserById = (_Id = '') => {
  return new Promise((resolve, reject) => {
    User.findById(_Id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { findUserById }
