const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const Access = require('../../models/userAccess')

/**
 * Get Accesses function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAccesses = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, Access, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAccesses }
