const PROCESS_ENV = require('config')
const consoleDialog = require('console-dialog')
const mongoose = require('mongoose')
const loadModels = require('../../app/models')

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise
    const dialog = consoleDialog()

    mongoose.connect(
      PROCESS_ENV.MONGO_URI,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err) => {
        if (err) {
          console.log(`Database error: ${err}`)
          process.exit(1)
        }

        dialog.header(`Starting Server`, { align: `center` })
        dialog.footer(`DB Connection: OK`, { align: `center` })
        dialog.append(`Port: ${PROCESS_ENV.PORT || 3000}`)
        dialog.append(`URL: http://localhost:${PROCESS_ENV.PORT || 3000}`)
        dialog.append(`NODE_ENV: ${process.env.NODE_ENV}`)
        dialog.append(`Database: MongoDB`)
        console.log(dialog.render({ corner: 'round', width: `dynamic` }))
      }
    )
    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  loadModels()
}
