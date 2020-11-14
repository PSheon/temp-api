const { matchedData } = require('express-validator')

const db = require('../../middleware/db')
const utils = require('../../middleware/utils')
const model = require('../../models/commodity')

/*********************
 * Private functions *
 *********************/

/**
 * Checks if a commodity already exists in database
 * @param {string} name - name of item
 */
const commodityExists = (commodityId = '') => {
  return new Promise((resolve, reject) => {
    model.findOne(
      {
        commodityId
      },
      (err, item) => {
        if (err) {
          return reject(utils.buildErrObject(422, err.message))
        }

        if (item) {
          return reject(utils.buildErrObject(422, 'COMMODITY_ALREADY_EXISTS'))
        }

        return resolve(false)
      }
    )
  })
}

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
    res.status(200).json(await db.getItems(req, model, query))
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
    req = matchedData(req)
    const doesCommodityExists = await commodityExists(req.name)
    if (!doesCommodityExists) {
      res.status(201).json(await db.createItem(req, model))
    }
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
