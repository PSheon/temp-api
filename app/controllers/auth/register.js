const { matchedData } = require('express-validator')

const {
  emailExists,
  sendRegistrationEmailMessage
} = require('../../middleware/emailer')
const { handleError } = require('../../middleware/utils')

const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    const doesEmailExists = await emailExists(data.email)
    if (!doesEmailExists) {
      const item = await registerUser(data)
      const userInfo = await setUserInfo(item)
      // @ANCHOR
      req.session.userId = userInfo._id
      req.session.userMemberId = userInfo.memberId
      const response = await returnRegisterToken(item, userInfo)
      sendRegistrationEmailMessage(locale, item)
      res.status(201).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
