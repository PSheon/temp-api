const ora = require('ora')
const chalk = require('chalk')

const { initDocker, startRedis, startMongo } = require('./helpers')

module.exports = async () => {
  const spinner = new ora('聯絡其他廠房...').start()

  try {
    const docker = await initDocker()

    const redisStatus = await startRedis(docker, spinner)
    const mongoStatus = await startMongo(docker, spinner)

    if (redisStatus.isNew || mongoStatus.isNew) {
      console.log('重新開啟工廠...')
      process.kill(process.pid, 'SIGUSR2')
    }
  } catch (error) {
    console.error(error)
    spinner.fail(`Docker 出現錯誤，${chalk.red('工廠暫停運作')}`)
    process.exit(1)
  }

  spinner.succeed('已啟用所有工廠')
}
