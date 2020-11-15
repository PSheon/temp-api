const { matchedData } = require('express-validator')

const { checkPassword } = require('../../middleware/auth')
const {
  isIDGood,
  handleError,
  buildErrObject
} = require('../../middleware/utils')

const { findUserById, updatePasswordInDB } = require('./helpers')

/**
 * Update User's password onself function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUserPasswordOnself = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await isIDGood(req.user._id)
    const user = await findUserById(_id)

    const isPasswordMatch = await checkPassword(data.oldPassword, user)

    if (!isPasswordMatch) {
      return handleError(res, buildErrObject(409, 'WRONG_PASSWORD'))
    } else {
      // all ok, proceed to change password
      res.status(200).json(await updatePasswordInDB(_id, data))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateUserPasswordOnself }
