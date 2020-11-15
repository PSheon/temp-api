const { matchedData } = require('express-validator')

const { checkPassword } = require('../../middleware/auth')
const { handleError } = require('../../middleware/utils')

const {
  findUserByEmail,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  generateToken,
  setUserInfo
} = require('./helpers')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUserByEmail(data.email)
    await userIsBlocked(user)
    await checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await checkPassword(data.password, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      req.session.userId = user._id
      req.session.userMemberId = user.memberId
      user.loginAttempts = 0
      await saveLoginAttemptsToDB(user)
      res.status(200).json({
        token: generateToken(user._id),
        user: await setUserInfo(user)
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
