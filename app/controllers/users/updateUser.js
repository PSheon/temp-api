const { matchedData } = require('express-validator')

const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const User = require('../../models/user')

/**
 * Update User function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)

    res.status(200).json(await updateItem(_id, User, data))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateUser }
