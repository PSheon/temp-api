const setupMongo = require('../setup/mongo')
const path = require('path')
const fs = require('fs')
const { removeExtensionFromFile } = require('../../app/middleware/utils')
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
  try {
    const promiseArray = models.map(
      async (model) => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)
    console.log('資料庫已清除！')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

clean()
