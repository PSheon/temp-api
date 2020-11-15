const { handleError } = require('../../middleware/utils')

const { checkPermissions } = require('./helpers')

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
const roleAuthorization = (roles) => async (req, res, next) => {
  try {
    const data = {
      _id: req.user._id,
      roles
    }
    await checkPermissions(data, next)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { roleAuthorization }
