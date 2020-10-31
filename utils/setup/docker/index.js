const ora = require('ora')
const chalk = require('chalk')

const { initDocker, startRedis, startMongo } = require('./helpers')

module.exports = async () => {
  const spinner = new ora('檢查其他容器...').start()

  try {
    const docker = await initDocker()

    const redisStatus = await startRedis(docker, spinner)
    const mongoStatus = await startMongo(docker, spinner)

    if (redisStatus.isNew || mongoStatus.isNew) {
      console.log('重新開啟容器...')
      process.kill(process.pid, 'SIGUSR2')
    }
  } catch (error) {
    console.error(error)
    spinner.fail(`Docker 出現錯誤，${chalk.red('容器暫停運作')}`)
    process.exit(1)
  }

  spinner.succeed(`${chalk.blue('[O]')} 已啟用所有容器`)
}
