const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const ora = require('ora')

const { removeExtensionFromFile } = require('../../app/middleware/utils')
const setupMongo = require('../setup/mongo')
const modelsPath = path.resolve(__dirname, '..', '../', 'app', 'models')

setupMongo()

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter((file) => {
  return removeExtensionFromFile(file) !== 'index'
})

const deleteModelFromDB = (model) => {
  return new Promise((resolve, reject) => {
    model = require(`../../app/models/${model}`)
    model.deleteMany({}, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const clean = async () => {
  const spinner = new ora('清理資料庫...').start()

  try {
    const promiseArray = models.map(
      async (model) => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)
    spinner.succeed(`${chalk.green('[1/2]')} 資料庫已清除！`)
    process.exit(0)
  } catch (err) {
    console.log(err)
    spinner.fail(`${chalk.red('[0/2]')} 資料庫清除失敗！`)
    process.exit(0)
  }
}

clean()
