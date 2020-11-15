const { validateDeleteAccess } = require('./validateDeleteAccess')
const { validateGetAccess } = require('./validateGetAccess')
const { validateUpdateAccess } = require('./validateUpdateAccess')

module.exports = {
  validateGetAccess,
  validateUpdateAccess,
  validateDeleteAccess
}
