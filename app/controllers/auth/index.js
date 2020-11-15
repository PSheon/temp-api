const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { logout } = require('./logout')
const { register } = require('./register')
const { resetPassword } = require('./resetPassword')
const { roleAuthorization } = require('./roleAuthorization')
const { verifyEmail } = require('./verifyEmail')

module.exports = {
  login,
  getRefreshToken,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  roleAuthorization
}
