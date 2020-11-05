const ora = require('ora')
const chalk = require('chalk')
const { setQueues } = require('bull-board')
const { UI: BullBoardUI } = require('bull-board')

const {
  echoAppQueue,
  imageProcessQueue,
  avatarProcessQueue
} = require('./queues')

const QueueManager = (app) => {
  const spinner = new ora(`設定 ${chalk.yellow('[App Queue]')} 中...`).start()

  setQueues([echoAppQueue, imageProcessQueue, avatarProcessQueue])

  app.use('/queue-dashboard', BullBoardUI)

  spinner.succeed(`${chalk.yellow('[App Queue]')} 已啟用`)
}

module.exports = {
  QueueManager
}
