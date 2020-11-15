const { matchedData } = require('express-validator')

const { deleteItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const Access = require('../../models/userAccess')

/**
 * Delete Acces function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteAccess = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(data._id)
    res.status(200).json(await deleteItem(_id, Access))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteAccess }
