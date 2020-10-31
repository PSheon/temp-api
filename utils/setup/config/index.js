const PROCESS_ENV = require('config')
const ora = require('ora')
const chalk = require('chalk')
const moment = require('moment')
require('moment-timezone')
require('moment/locale/zh-tw')

const validate = require('./helpers/validate')

module.exports = () => {
  console.log(`運行環境 > ${chalk.blue(process.env.NODE_ENV)}`)

  const spinner = new ora('檢查設定參數...').start()

  // ANCHOR find better solution
  validate(PROCESS_ENV)

  /* Moment */
  moment.locale('zh-tw')
  moment.tz.setDefault('Asia/Taipei')

  spinner.succeed(`${chalk.green('[1/3]')} 設定正確`)
}
