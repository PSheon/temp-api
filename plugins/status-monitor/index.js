const chalk = require('chalk')
const ora = require('ora')

const { socketIoInit, validateConfig } = require('./helpers')

const StatusMonitor = (websocket, config) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[Status Monitor]')} 中...`
  ).start()

  const validatedConfig = validateConfig(config)

  socketIoInit(websocket, validatedConfig)

  spinner.succeed(`${chalk.yellow('[Status Monitor]')} 已啟用`)
}

module.exports = {
  StatusMonitor
}
