const _fs = require('fs')

const bluebird = require('bluebird')
const pm = require('pm2')

const TYPES = require('../../../constants/app-manager')
const fs = bluebird.promisifyAll(_fs)

const getList = () =>
  new Promise((resolve, reject) =>
    pm.list((err, list) => (err ? reject(err) : resolve(list)))
  )

const getApp = async (name) => {
  const list = await getList()
  const apps = []

  for (let i = 0; i < list.length; i++) {
    const app = list[i]

    if (app.name !== name) {
      continue
    }

    apps.push(app)

    if (app.pm2_env.exec_mode !== TYPES.ExecMode.CLUSTER) {
      break
    }
  }

  const temp = apps[0]

  if (!temp) {
    return null
  }

  return {
    name: temp.name,
    // eslint-disable-next-line
    pm_id: temp.pm_id,
    // eslint-disable-next-line
    exec_mode: temp.pm2_env.exec_mode,
    instances: apps
  }
}

const getDescription = (pmId) =>
  new Promise((resolve, reject) =>
    pm.describe(pmId, (err, list) => (err ? reject(err) : resolve(list)))
  )

const getLogs = async (pmId) => {
  const [app] = await getDescription(pmId)

  if (!app) {
    throw new Error('App ID 不存在.')
  }

  // eslint-disable-next-line
  const { pm_out_log_path, pm_err_log_path } = app.pm2_env

  const response = {
    app,
    // eslint-disable-next-line
    output: pm_out_log_path
      ? await fs.readFileAsync(pm_out_log_path, 'utf8')
      : '尚未提供日誌文件.',
    // eslint-disable-next-line
    error: pm_err_log_path
      ? await fs.readFileAsync(pm_err_log_path, 'utf8')
      : '尚未提供日誌文件.'
  }

  return response
}

// TODO
const startApp = (scriptPath, scriptConfig) =>
  new Promise((resolve, reject) =>
    pm.start(scriptPath, scriptConfig, (err, proc) =>
      err ? reject(err) : resolve(proc)
    )
  )

const stopApp = (name) =>
  new Promise((resolve, reject) =>
    pm.stop(name, (err) => (err ? reject(err) : resolve()))
  )

const restartApp = (name) =>
  new Promise((resolve, reject) =>
    pm.restart(name, (err) => (err ? reject(err) : resolve()))
  )

const reloadApp = (name) =>
  new Promise((resolve, reject) =>
    pm.reload(name, (err) => (err ? reject(err) : resolve()))
  )

const deleteApp = (name) =>
  new Promise((resolve, reject) =>
    pm.delete(name, (err) => (err ? reject(err) : resolve()))
  )

module.exports = {
  getList,
  getApp,
  getDescription,
  getLogs,
  // TODO
  startApp,
  stopApp,
  restartApp,
  reloadApp,
  deleteApp
}
