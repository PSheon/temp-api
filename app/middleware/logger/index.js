const UserAccess = require('../../models/userAccess')
const {
  getIP,
  getBrowserInfo,
  getCountry,
  getMethod,
  getPathname,
  buildErrObject
} = require('../utils')
// const helpers = require('./helpers')

module.exports = {
  /**
   * Saves user's access
   * @param {Object} req - request object
   */
  async saveUserAccess(req) {
    return new Promise((resolve, reject) => {
      const userId = req.session.userId
      console.log('userId, ', userId)
      const userMemberId = req.session.userMemberId
      console.log('userMemberId, ', userMemberId)

      const userAccess = new UserAccess({
        ip: getIP(req),
        browser: getBrowserInfo(req),
        country: getCountry(req),
        method: getMethod(req),
        pathname: getPathname(req)
      })
      if (userId) {
        userAccess.set('user', userId)
      }
      if (userMemberId) {
        userAccess.set('memberId', userMemberId)
      }

      userAccess.save((err) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }

        resolve()
      })
    })
  }
}
