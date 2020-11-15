const { matchedData } = require('express-validator')

const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const Commodity = require('../../models/commodity')

const { commodityExists } = require('./helpers')

/**
 * Create Commodity function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCommodity = async (req, res) => {
  try {
    const data = matchedData(req)
    const doesCommodityExists = await commodityExists(data.displayName)
    if (!doesCommodityExists) {
      res.status(201).json(await createItem(data, Commodity))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createCommodity }
