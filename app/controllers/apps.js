const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const {
  getList,
  getApp,
  getLogs,
  stopApp,
  deleteApp,
  reloadApp,
  restartApp
} = require('../../plugins/app-manager')
const { AppAction } = require('../../types/app-manager')

/*********************
 * Private functions *
 *********************/

/**
 * Gets all items from pm2-runtime
 */
const getAllItemsFromPM2 = async () => {
  return await getList()
}

/********************
 * Public functions *
 ********************/

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromPM2())
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
// exports.getItems = async (req, res) => {
//   try {
//     const query = await db.checkQueryString(req.query)
//     res.status(200).json(await db.getItems(req, model, query))
//   } catch (error) {
//     utils.handleError(res, error)
//   }
// }

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    req = matchedData(req)

    const appId = req.appId
    res.status(200).json(await getApp(appId))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get item logs function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItemLogs = async (req, res) => {
  try {
    req = matchedData(req)

    const { appId, instanceId } = req
    const { app, output, error } = await getLogs(instanceId)

    if (app.name !== appId) {
      res.status(500).json({
        message: '應用程序名稱和 PM2 識別器不相同.'
      })
    }

    res.status(200).json({ output, error })
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update item function called by route
 * Manage app status. start, restart, reload...etc
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { appId, action } = req

    const actions = {
      [AppAction.DELETE]: deleteApp,
      [AppAction.STOP]: stopApp,
      [AppAction.RELOAD]: reloadApp,
      [AppAction.RESTART]: restartApp,
      [AppAction.START]: restartApp
    }

    const fn = actions[action]

    await fn(appId)
    res.status(200).json({ status: 'Succeed' })
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
// exports.createItem = async (req, res) => {
//   try {
//     req = matchedData(req)
//     const doesCityExists = await cityExists(req.name)
//     if (!doesCityExists) {
//       res.status(201).json(await db.createItem(req, model))
//     }
//   } catch (error) {
//     utils.handleError(res, error)
//   }
// }

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
// exports.deleteItem = async (req, res) => {
//   try {
//     req = matchedData(req)
//     const id = await utils.isIDGood(req.id)
//     res.status(200).json(await db.deleteItem(id, model))
//   } catch (error) {
//     utils.handleError(res, error)
//   }
// }
