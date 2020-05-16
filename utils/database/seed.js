const PROCESS_ENV = require('config')
const { Seeder } = require('mongo-seeding')
const path = require('path')
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
  try {
    await seeder.import(collections)
    console.log('資料庫已更新!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

main()
