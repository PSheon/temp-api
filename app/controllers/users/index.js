const model = require('../../models/user')
const UserAccess = require('../../models/userAccess')
const uuid = require('uuid')
const { matchedData } = require('express-validator')
const utils = require('../../middleware/utils')
const db = require('../../middleware/db')
const emailer = require('../../middleware/emailer')

/*********************
 * Private functions *
 *********************/

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = async (req) => {
  return new Promise((resolve, reject) => {
    const user = new model({
      memberId: req.memberId,
      email: req.email,
      password: req.password,
      role: req.role,
      phone: req.phone,
      verification: uuid.v4()
    })
    user.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      // Removes properties with rest operator
      const removeProperties = ({
        // eslint-disable-next-line no-unused-vars
        password,
        // eslint-disable-next-line no-unused-vars
        blockExpires,
        // eslint-disable-next-line no-unused-vars
        loginAttempts,
        // eslint-disable-next-line no-unused-vars
        createdAt,
        // eslint-disable-next-line no-unused-vars
        updatedAt,
        ...rest
      }) => rest
      resolve(removeProperties(item.toObject()))
    })
  })
}
/**
 * Saves a user access
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccess = async (req, user) => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: !!user && !!user.email ? user.email : req.user.email,
      ip: utils.getIP(req),
      browser: utils.getBrowserInfo(req),
      country: utils.getCountry(req),
      method: req.method,
      action: `${req.baseUrl}${req.path}`
    })
    userAccess.save((err) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }

      resolve()
    })
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    await saveUserAccess(req)
    res.status(200).json(await db.getItems(req, model, query))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await utils.isIDGood(data._id)
    await saveUserAccess(req)
    res.status(200).json(await db.getItem(_id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await utils.isIDGood(data._id)

    await saveUserAccess(req)
    res.status(200).json(await db.updateItem(_id, model, data))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    const data = matchedData(req)
    const doesEmailExists = await emailer.emailExists(data.email)
    if (!doesEmailExists) {
      const item = await createItem(data)
      emailer.sendRegistrationEmailMessage(locale, item)
      await saveUserAccess(req)
      res.status(201).json(item)
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    const data = matchedData(req)
    const _id = await utils.isIDGood(data._id)
    await saveUserAccess(req)
    res.status(200).json(await db.deleteItem(_id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
