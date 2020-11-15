const { getItems, checkQueryString } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const User = require('../../models/user')

/**
 * Get Users function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, User, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUsers }
