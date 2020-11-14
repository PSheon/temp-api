const PROCESS_ENV = require('config')
const path = require('path')

const chalk = require('chalk')
const { Seeder } = require('mongo-seeding')
const ora = require('ora')
const config = {
  database: PROCESS_ENV.MONGO_URI,
  inputPath: path.resolve(__dirname, 'utils', 'database', 'data'),
  dropDatabase: false
}
const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(
  path.resolve('utils', 'database', 'data')
)

const main = async () => {
  const spinner = new ora('更新資料庫...').start()

  try {
    await seeder.import(collections)
    spinner.succeed(`${chalk.green('[2/2]')} 資料庫已更新`)
    process.exit(0)
  } catch (err) {
    console.log(err)
    spinner.fail(`${chalk.red('[1/2]')} 資料庫清除失敗！`)
    process.exit(0)
  }
}

main()
