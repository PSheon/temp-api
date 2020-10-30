const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserAccessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    memberId: {
      type: String,
      validate: {
        validator: validator.isAlphanumeric,
        message: 'MEMBER_ID_ONLY_ACCEPT_ALPHA_NUMERIC'
      },
      lowercase: true
    },
    ip: {
      type: String,
      required: true
    },
    browser: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true,
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OTHER']
    },
    pathname: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
UserAccessSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('UserAccess', UserAccessSchema)
