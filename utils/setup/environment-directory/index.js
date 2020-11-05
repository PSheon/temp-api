const PROCESS_ENV = require('config')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const installFFMPEG = require('./helpers/install-ffmpeg')

/* eslint max-statements: ["error", 25] */
/* eslint complexity: ["error", 15] */
module.exports = () => {
  const spinner = new ora('檢查文件路徑中...')
  const baseDirName = path.resolve(__dirname, '../../../')

  /* FFMPEG */
  if (!fs.existsSync(path.join(baseDirName, 'ffmpeg'))) {
    fs.mkdirSync(path.join(baseDirName, 'ffmpeg'))
  }
  if (!fs.existsSync(path.join(baseDirName, 'ffmpeg', 'ffmpeg'))) {
    console.log(`安裝 'ffmpeg'`)
    installFFMPEG(baseDirName)
  }
  if (!fs.existsSync(path.join(baseDirName, 'ffmpeg', 'ffprobe'))) {
    console.log(`安裝 'ffprobe'`)
    installFFMPEG(baseDirName)
  }

  /* 圖片ｌ音樂 上傳路徑 */
  if (!fs.existsSync(path.join(baseDirName, 'uploads'))) {
    fs.mkdirSync(path.join(baseDirName, 'uploads'))
  }
  if (!fs.existsSync(path.join(baseDirName, 'uploads', 'temp'))) {
    fs.mkdirSync(path.join(baseDirName, 'uploads', 'temp'))
  }
  if (!fs.existsSync(path.join(baseDirName, 'uploads', 'image'))) {
    fs.mkdirSync(path.join(baseDirName, 'uploads', 'image'))
  }
  if (!fs.existsSync(path.join(baseDirName, 'uploads', 'avatar'))) {
    fs.mkdirSync(path.join(baseDirName, 'uploads', 'avatar'))
  }
  if (!fs.existsSync(path.join(baseDirName, 'uploads', 'audio'))) {
    fs.mkdirSync(path.join(baseDirName, 'uploads', 'audio'))
  }

  if (
    PROCESS_ENV.ENABLE_SWAGGER_DOCS_UI &&
    !fs.existsSync(path.join(baseDirName, 'docs'))
  ) {
    fs.mkdirSync(path.join(baseDirName, 'docs'))
  }

  if (
    PROCESS_ENV.ENABLE_LOG_RECORDER &&
    !fs.existsSync(path.join(baseDirName, 'logs'))
  ) {
    fs.mkdirSync(path.join(baseDirName, 'logs'))
  }

  spinner.succeed(`${chalk.green('[文件路徑]')} 已建立`)
}
