const { buildErrObject } = require('../../../middleware/utils')
const Commodity = require('../../../models/commodity')

/**
 * Checks if a Commodity already exists in database
 * @param {string} displayName - displayName of item
 */
const commodityExists = (displayName = '') => {
  return new Promise((resolve, reject) => {
    Commodity.findOne(
      {
        displayName
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

module.exports = { commodityExists }
