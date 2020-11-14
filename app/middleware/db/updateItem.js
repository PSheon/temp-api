const { itemNotFound } = require('../../middleware/utils')

/**
 * Updates an item in database by _id
 * @param {string} _id - item id
 * @param {Object} req - request object
 */
const updateItem = (_id = '', model = {}, req = {}) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      _id,
      req,
      {
        new: true,
        runValidators: true
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { updateItem }
