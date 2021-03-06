const { matchedData } = require('express-validator')

const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const Commodity = require('../../models/commodity')

/**
 * Get Commodity function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCommodity = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)
    res.status(200).json(await getItem(_id, Commodity))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getCommodity }
