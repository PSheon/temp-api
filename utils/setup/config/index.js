const PROCESS_ENV = require('config')

const chalk = require('chalk')
const moment = require('moment')
const ora = require('ora')
require('moment-timezone')
require('moment/locale/zh-tw')

const { validateConfig } = require('./helpers')

module.exports = () => {
  console.log(`運行環境 > ${chalk.blue(process.env.NODE_ENV)}`)

  const spinner = new ora('檢查設定參數...').start()

  validateConfig(PROCESS_ENV)

  /* Moment */
  moment.locale('zh-tw')
  moment.tz.setDefault('Asia/Taipei')

  spinner.succeed(`${chalk.green('[環境設定]')} 格式正確`)
}
