const ora = require('ora')
const chalk = require('chalk')
// TODO
const {
  getList,
  getApp,
  getDescription,
  getLogs,
  startApp,
  stopApp,
  restartApp,
  reloadApp,
  deleteApp
} = require('./helpers')

const AppManager = (app) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[APP Message Queue Manager]')} 中...`
  ).start()

  // TODO
  // app.use('/app-manager', (req, res, next) => {
  //   next()
  // })

  spinner.succeed(`${chalk.yellow('[APP Message Queue Manager]')} 已啟用`)
}

module.exports = {
  AppManager,
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
