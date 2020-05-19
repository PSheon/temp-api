const userModel = require('../models/user')
const accessModel = require('../models/userAccess')
const utils = require('../middleware/utils')
const { matchedData } = require('express-validator')
const auth = require('../middleware/auth')

/*********************
 * Private functions *
 *********************/

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = async (id) => {
  return new Promise((resolve, reject) => {
    userModel.findById(id, '-_id -updatedAt -createdAt', (err, user) => {
      utils.itemNotFound(err, user, reject, 'NOT_FOUND')
      resolve(user)
    })
  })
}

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = async (req, _id) => {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndUpdate(
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
    userModel.findById(id, 'password email', (err, user) => {
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
    userModel.findById(id, '+password', (err, user) => {
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

/**
 * Gets last 15 accesses log from database
 */
const findUserAccesses = async (email) => {
  return new Promise((resolve, reject) => {
    accessModel.find(
      { email },
      '-email -updatedAt',
      {
        sort: {
          updatedAt: -1
        },
        limit: 15
      },
      (err, accessHistory) => {
        utils.itemNotFound(err, accessHistory, reject, 'NOT_FOUND')
        resolve(accessHistory)
      }
    )
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getProfile = async (req, res) => {
  try {
    const _id = await utils.isIDGood(req.user._id)
    res.status(200).json(await getProfileFromDB(_id))
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
    req = matchedData(req)
    res.status(200).json(await updateProfileInDB(req, _id))
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
    req = matchedData(req)
    const isPasswordMatch = await auth.checkPassword(req.oldPassword, user)
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
 * Get last 15 access history by user _id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAccesses = async (req, res) => {
  try {
    await utils.isIDGood(req.user._id)
    const email = req.user.email
    res.status(200).json(await findUserAccesses(email))
  } catch (error) {
    utils.handleError(res, error)
  }
}
