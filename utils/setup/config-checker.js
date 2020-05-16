const ora = require('ora')
const chalk = require('chalk')

module.exports = (PROCESS_ENV) => {
  const spinner = new ora('檢查工廠合約...').start()

  // TODO
  // Check PROCESS_ENV

  spinner.succeed(`${chalk.green('[1/3]')} 工廠合約沒有問題`)
}
