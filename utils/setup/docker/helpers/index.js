const chalk = require('chalk')
const Docker = require('dockerode')

const startMongo = require('./mongo')
const startRedis = require('./redis')
const stopContainer = require('./stop-container')

const docker = new Docker()

const initDocker = async () => {
  const DOCKER_VERSION = await docker.version()
  console.log(
    `\n${chalk.cyan('Docker')} 版本 ${chalk.yellow(
      `v${DOCKER_VERSION.Version}`
    )}`
  )
  console.log(
    `${chalk.cyan('Docker')} API版本 ${chalk.yellow(
      `v${DOCKER_VERSION.ApiVersion}`
    )}`
  )

  return docker
}

module.exports = {
  initDocker,
  startRedis,
  startMongo,
  stopContainer
}
