const { handleError } = require('../../middleware/utils')

/**
 * Logout function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const logout = async (req, res) => {
  try {
    delete req.session.userId
    delete req.session.userMemberId
    req.session.destroy()
    res.status(200).json({ message: 'logout' })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { logout }
