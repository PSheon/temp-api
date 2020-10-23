const { matchedData } = require('express-validator')
const model = require('../../models/user')
const utils = require('../../middleware/utils')
const auth = require('../../middleware/auth')
const db = require('../../middleware/db')
const { avatarProcessQueue } = require('../../../plugins/queue-manager/queues')

/*********************
 * Private functions *
 *********************/

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = async (req, _id) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      _id,
      req,
      {
        new: true,
        runValidators: true,
        select: '-updatedAt -createdAt'
      },
      (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND')
        resolve(user)
      }
    )
  })
}

/**
 * Finds user by id
 * @param {string} email - user id
 */
const findUser = async (id) => {
  return new Promise((resolve, reject) => {
    model.findById(id, 'password email', (err, user) => {
      utils.itemNotFound(err, user, reject, 'USER_DOES_NOT_EXIST')
      resolve(user)
    })
  })
}

/**
 * Build passwords do not match object
 * @param {Object} user - user object
 */
const passwordsDoNotMatch = async () => {
  return new Promise((resolve) => {
    resolve(utils.buildErrObject(409, 'WRONG_PASSWORD'))
  })
}

/**
 * Changes password in database
 * @param {string} id - user id
 * @param {Object} req - request object
 */
const changePasswordInDB = async (id, req) => {
  return new Promise((resolve, reject) => {
    model.findById(id, '+password', (err, user) => {
      utils.itemNotFound(err, user, reject, 'NOT_FOUND')

      // Assigns new password to user
      user.password = req.newPassword

      // Saves in DB
      user.save((error) => {
        if (err) {
          reject(utils.buildErrObject(422, error.message))
        }
        resolve(utils.buildSuccObject('PASSWORD_CHANGED'))
      })
    })
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get Profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await utils.isIDGood(data._id)
    res.status(200).json(await db.getItem(_id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateProfile = async (req, res) => {
  try {
    const _id = await utils.isIDGood(req.user._id)
    const data = matchedData(req)
    res.status(200).json(await updateProfileInDB(data, _id))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.changePassword = async (req, res) => {
  try {
    const _id = await utils.isIDGood(req.user._id)
    const user = await findUser(_id)
    const data = matchedData(req)
    const isPasswordMatch = await auth.checkPassword(data.oldPassword, user)
    if (!isPasswordMatch) {
      utils.handleError(res, await passwordsDoNotMatch())
    } else {
      // all ok, proceed to change password
      res.status(200).json(await changePasswordInDB(_id, req))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update profile Avatar image function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateAvatar = async (req, res) => {
  try {
    // Find old Image, delete it if exist
    const id = await utils.isIDGood(req.user._id)
    avatarProcessQueue.add({
      oldAvatar: req.user.photoURL,
      newAvatar: req.file.filename
    })
    req.photoURL = req.file.filename

    res.status(200).json(await updateProfileInDB(req, id))
  } catch (error) {
    utils.handleError(res, error)
  }
}
