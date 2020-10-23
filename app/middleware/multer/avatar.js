const multer = require('multer')
const path = require('path')
const mime = require('mime-types')
const moment = require('moment')
const shortUUID = require('short-uuid')

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml']

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../', '../', '../', 'uploads', 'avatar'))
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${moment().utc().format('YYYYMMDD')}-${req.user.memberId
        .split(/[ !@#$%^&*\(\)-+]/gms)
        .join('_')}-${shortUUID.generate()}.${mime.extension(file.mimetype)}`
    )
  }
})

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    // eslint-disable-next-line
    cb(null, true)
  } else {
    // eslint-disable-next-line
    cb(null, false)
  }
}

/**
 * Avatar Uploader
 * @param null
 */
module.exports = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024 * 10
})
