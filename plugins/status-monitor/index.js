const ora = require('ora')
const chalk = require('chalk')
const validate = require('./helpers/validate')
const socketIoInit = require('./helpers/socket-io-init')

const StatusMonitor = (websocket, config) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[Status Monitor]')} 中...`
  ).start()

  const validatedConfig = validate(config)

  socketIoInit(websocket, validatedConfig)

  spinner.succeed(`${chalk.yellow('[Status Monitor]')} 已啟用`)
}

module.exports = {
  StatusMonitor
}
