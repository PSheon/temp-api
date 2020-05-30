const Docker = require('dockerode')
const chalk = require('chalk')

const startRedis = require('./redis')
const startMongo = require('./mongo')
const stopContainer = require('./stop-container')

const docker = new Docker()

const initDocker = async () => {
  const DOCKER_VERSION = await docker.version()
  console.log(`\nDocker 版本 ${chalk.yellow(`v${DOCKER_VERSION.Version}`)}`)
  console.log(`Docker API版本 ${chalk.yellow(`v${DOCKER_VERSION.ApiVersion}`)}`)

  return docker
}

module.exports = {
  initDocker,
  startRedis,
  startMongo,
  stopContainer
}
