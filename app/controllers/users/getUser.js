const { matchedData } = require('express-validator')

const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const User = require('../../models/user')

/**
 * Get User function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)
    res.status(200).json(await getItem(_id, User))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUser }
