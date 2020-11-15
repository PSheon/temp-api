const { matchedData } = require('express-validator')

const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const Commodity = require('../../models/commodity')

const { commodityExistsExcludingItself } = require('./helpers')

/**
 * Update Commodity function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateCommodity = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)
    const doesCommodityExists = await commodityExistsExcludingItself(
      _id,
      req.displayName
    )
    if (!doesCommodityExists) {
      res.status(200).json(await updateItem(_id, Commodity, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateCommodity }
