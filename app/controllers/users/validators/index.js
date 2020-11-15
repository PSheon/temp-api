const { validateDeleteUser } = require('./validateDeleteUser')
const { validateGetUser } = require('./validateGetUser')
const { validateUpdatePassword } = require('./validateUpdatePassword')
const { validateUpdateUser } = require('./validateUpdateUser')
const { validateUpdateUserRole } = require('./validateUpdateUserRole')

module.exports = {
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser,
  validateUpdateUserRole,
  validateUpdatePassword
}
