const { matchedData } = require('express-validator')

const { sendResetPasswordEmailMessage } = require('../../middleware/emailer')
const { handleError } = require('../../middleware/utils')

const {
  findUserByEmail,
  forgotPasswordResponse,
  saveForgotPassword
} = require('./helpers')

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    await findUserByEmail(data.email)
    const item = await saveForgotPassword(req)
    sendResetPasswordEmailMessage(locale, item)
    res.status(200).json(forgotPasswordResponse(item))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { forgotPassword }
