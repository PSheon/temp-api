const path = require('path')

const mime = require('mime-types')
const multer = require('multer')
const randomize = require('randomatic')

const { sanitizeUserDisplayname } = require('./helpers')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '../../../', 'uploads', 'temp'))
  },
  filename: (req, file, callback) => {
    const newAvatarName = `${randomize('0', 7)}_${sanitizeUserDisplayname(
      'req-user displayName'
    )}.${mime.extension(file.mimetype)}`
    req.body.avatarName = newAvatarName

    console.log('avatarName, ', newAvatarName)

    callback(null, newAvatarName)
  }
})

const fileFilter = (req, file, callback) => {
  if (
    // file.mimetype.startsWith('image/')
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/svg+xml'
  ) {
    // eslint-disable-next-line
    callback(null, true)
  } else {
    // eslint-disable-next-line
    callback(null, false)
  }
}

/**
 * Avatar Upload Middleware
 * @param null
 */
module.exports = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024 * 5 // 6 Mb
})
