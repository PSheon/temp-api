const ora = require('ora')
const validate = require('./helpers/validate')
const socketIoInit = require('./helpers/socket-io-init')

const StatusMonitor = (websocket, config) => {
  const spinner = new ora('打開監視器...').start()
  const validatedConfig = validate(config)

  socketIoInit(websocket, validatedConfig)

  spinner.succeed('工廠監視器已上線')
}

module.exports = {
  StatusMonitor
}
