const { validateForgotPassword } = require('./validateForgotPassword')
const { validateGetRefreshToken } = require('./validateGetRefreshToken')
const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateResetPassword } = require('./validateResetPassword')
const { validateVerifyEmail } = require('./validateVerifyEmail')

module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateGetRefreshToken,
  validateVerifyEmail
}
