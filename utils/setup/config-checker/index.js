const ora = require('ora')
const chalk = require('chalk')

const validate = require('./helpers/validate')

module.exports = (PROCESS_ENV) => {
  console.log(`工廠運行環境 > ${chalk.blue(process.env.NODE_ENV)}`)

  const spinner = new ora('檢查工廠合約...').start()

  // ANCHOR find better solution
  validate(PROCESS_ENV)

  spinner.succeed(`${chalk.green('[1/3]')} 簽訂合約`)
}
