const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getUsers } = require('./getUsers')
const { updateUser } = require('./updateUser')
const { updateUserPasswordOnself } = require('./updateUserPasswordOnself')

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserPasswordOnself
}
