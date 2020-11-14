const path = require('path')

const ffbinaries = require('ffbinaries')

module.exports = (baseDirName) => {
  const platform = ffbinaries.detectPlatform()
  ffbinaries.downloadFiles(
    ['ffmpeg', 'ffprobe'],
    {
      platform,
      quiet: true,
      destination: path.resolve(baseDirName, 'ffmpeg')
    },
    (err) => {
      if (err) {
        console.log(`FFMPEG install failed: ${err}`)
        process.exit(1)
      }

      console.log('FFMPEG 安裝成功')
    }
  )
}
