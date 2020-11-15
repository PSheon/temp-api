const { matchedData } = require('express-validator')

const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const Access = require('../../models/userAccess')

/**
 * Update Access function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateAccess = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)

    res.status(200).json(await updateItem(_id, Access, data))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateAccess }
