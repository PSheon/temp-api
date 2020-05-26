const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const mobilePhoneValidator = (phone) =>
  validator.isMobilePhone(phone, ['zh-TW'], { strictMode: true })

const GoogleProvider = new mongoose.Schema({
  id: {
    type: String,
    default: null
  },
  accessToken: {
    type: String,
    default: null
  },
  displayName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'GOOGLE_EMAIL_IS_NOT_VALID'
    },
    default: null
  },
  photoURL: {
    type: String,
    default: null
  }
})

const UserSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      validate: {
        validator: validator.isAlphanumeric,
        message: 'MEMBER_ID_ONLY_ACCEPT_ALPHA_NUMERIC'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['trial', 'user', 'staff', 'admin'],
      default: 'trial'
    },

    /* Third Party Login */
    google: {
      type: GoogleProvider,
      default: null
    },

    /* Profile */
    displayName: {
      type: String,
      required: false
    },
    photoURL: {
      type: String,
      default: 'assets/images/avatars/default.png',
      required: false
    },
    secondaryEmail: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true
    },
    phone: {
      type: String,
      validate: {
        validator: mobilePhoneValidator,
        message: 'EMAIL_IS_NOT_VALID'
      },
      required: false
    },
    shortcuts: {
      type: [String],
      default: ['bot-setting', 'market', 'leader-board', 'referrals']
    },
    settings: {
      currency: {
        type: String,
        enum: ['TWD', 'USD'],
        default: 'TWD'
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'dark'
      },
      notification: {
        type: Boolean,
        default: true
      }
    },

    /* Referrals */
    level: {
      type: Number,
      enum: [1, 2, 3],
      default: 1
    },
    points: {
      type: Number,
      default: 0
    },
    referralParent: {
      type: String,
      default: ''
    },
    referralChildList: {
      type: [String],
      default: []
    },

    /* Security */
    lastPasswordUpdatedAt: {
      type: Date,
      select: false,
      default: Date.now
    },
    verification: {
      type: String,
      select: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    },

    /* Account Status */
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}
UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', UserSchema)
