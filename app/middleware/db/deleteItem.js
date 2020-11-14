const { buildSuccObject, itemNotFound } = require('../../middleware/utils')

/**
 * Deletes an item from database by _id
 * @param {string} _id - id of item
 */
const deleteItem = (_id = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(_id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(buildSuccObject('DELETED'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { deleteItem }
