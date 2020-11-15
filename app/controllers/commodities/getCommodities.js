const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const Commodity = require('../../models/commodity')

/**
 * Get Commodities function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommodities = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, Commodity, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getCommodities }
