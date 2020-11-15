const { matchedData } = require('express-validator')

const { handleError } = require('../../middleware/utils')

const { verificationExists, verifyUser } = require('./helpers')

/**
 * Verify email function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verifyEmail = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await verificationExists(data.verification)
    res.status(200).json(await verifyUser(user))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verifyEmail }
