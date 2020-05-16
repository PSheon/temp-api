const ora = require('ora')
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

const AppManager = () => {
  const spinner = new ora('喚醒工廠主管...').start()

  spinner.succeed('工廠主管已上線')
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
