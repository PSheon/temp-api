const { matchedData } = require('express-validator')

const { handleError } = require('../../middleware/utils')

const {
  findForgotPassword,
  findUserByEmail,
  updatePassword,
  markResetPasswordAsUsed
} = require('./helpers')

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const forgotPassword = await findForgotPassword(data.verification)
    const user = await findUserByEmail(forgotPassword.email)
    await updatePassword(data.password, user)
    res.status(200).json(await markResetPasswordAsUsed(req, forgotPassword))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { resetPassword }
