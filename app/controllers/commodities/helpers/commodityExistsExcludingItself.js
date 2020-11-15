const { buildErrObject } = require('../../../middleware/utils')
const Commodity = require('../../../models/commodity')

/**
 * Checks if a Commodity already exists excluding itself
 * @param {string} _id - id of item
 * @param {string} displayName - displayName of item
 */
const commodityExistsExcludingItself = (_id = '', displayName = '') => {
  return new Promise((resolve, reject) => {
    Commodity.findOne(
      {
        displayName,
        _id: {
          $ne: _id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'COMMODITY_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { commodityExistsExcludingItself }
