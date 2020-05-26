const mongoose = require('mongoose')

const ReferralHistorySchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rewardPoints: {
      type: Number,
      required: true,
      enum: [50, 60, 75, 90, 120, 150]
    },
    finishedAt: {
      type: Date,
      default: () => new Date(Number(new Date()) + 24 * 60 * 60 * 1000)
    },
    claimed: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('ReferralHistory', ReferralHistorySchema)
