const UserAccess = require('../../models/userAccess')
const utils = require('../../middleware/utils')
// const helpers = require('./helpers')

module.exports = {
  /**
   * Saves user's access
   * @param {Object} req - request object
   */
  async saveUserAccess(req) {
    return new Promise((resolve, reject) => {
      const userId = req.session.userId
      const userMemberId = req.session.userMemberId

      const userAccess = new UserAccess({
        ip: utils.getIP(req),
        browser: utils.getBrowserInfo(req),
        country: utils.getCountry(req),
        method: utils.getMethod(req),
        pathname: utils.getPathname(req)
      })
      if (userId) {
        userAccess.set('user', userId)
      }
      if (userMemberId) {
        userAccess.set('memberId', userMemberId)
      }

      userAccess.save((err) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }

        resolve()
      })
    })
  }
}
