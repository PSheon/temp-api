const { matchedData } = require('express-validator')

const { deleteItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const User = require('../../models/user')

// @ANCHOR
/**
 * Delete User function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteUser = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)
    res.status(200).json(await deleteItem(_id, User))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteUser }
