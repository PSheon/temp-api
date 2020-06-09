const ora = require('ora')
const { setQueues } = require('bull-board')

const {
  echoAppQueue,
  imageProcessQueue,
  avatarProcessQueue
} = require('./queues')

const QueueManager = () => {
  const spinner = new ora('喚醒機器工人...').start()
  setQueues([echoAppQueue, imageProcessQueue, avatarProcessQueue])

  spinner.succeed('機器工人已上線')
}

module.exports = {
  QueueManager
}
