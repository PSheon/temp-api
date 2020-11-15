/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      memberId: req.memberId,
      email: req.email,
      role: req.role,
      google: req.google ? req.google : null,
      photoURL: req.photoURL,
      phone: req.phone,
      shortcuts: req.shortcuts,
      referralParent: req.referralParent,
      referralChildList: req.referralChildList,
      lastPasswordUpdatedAt: req.lastPasswordUpdatedAt,
      verified: req.verified,
      active: req.active
    }
    // Adds verification for testing purposes
    if (process.env.NODE_ENV !== 'production') {
      user = {
        ...user,
        verification: req.verification
      }
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
