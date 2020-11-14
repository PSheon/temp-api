const { matchedData } = require('express-validator')

const db = require('../../middleware/db')
const utils = require('../../middleware/utils')
const model = require('../../models/userAccess')

/*********************
 * Private functions *
 *********************/

/**
 * Pending
 * @param {*} req
 * @param {*} res
 */

/********************
 * Public functions *
 ********************/

/**
 * Get item function called by route
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
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    const populate = { path: 'user', select: '-_id -createdAt' }
    res.status(200).json(await db.getItems({ ...req, populate }, model, query))
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

    res.status(200).json(await db.updateItem(_id, model, data))
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
    res.status(200).json(await db.deleteItem(_id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
