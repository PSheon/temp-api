const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by _id
 * @param {string} _id - item id
 */
const getItem = (_id = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findById(_id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getItem }
