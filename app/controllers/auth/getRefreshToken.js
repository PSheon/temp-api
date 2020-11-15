const { matchedData } = require('express-validator')

const { isIDGood, handleError } = require('../../middleware/utils')

const {
  generateToken,
  getUserIdFromToken,
  findUserById,
  setUserInfo
} = require('./helpers')

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRefreshToken = async (req, res) => {
  try {
    const data = matchedData(req)
    const tokenEncrypted =
      data.token || req.headers.authorization.replace('Bearer ', '').trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)
    /* @ANCHOR */
    req.session.userId = user._id
    req.session.userMemberId = user.memberId

    // Removes user info from response
    // TODO
    // delete token.user
    res.status(200).json({
      token: generateToken(user._id),
      user: await setUserInfo(user)
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getRefreshToken }
