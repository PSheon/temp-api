const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const validator = require('validator')

const CommoditySchema = new mongoose.Schema(
  {
    codeName: {
      type: String,
      validate: {
        validator: validator.isAlphanumeric,
        message: 'COMMODITY_ID_ONLY_ACCEPT_ALPHA_NUMERIC'
      },
      lowercase: true
    },
    displayName: {
      type: String
    },
    insight: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
CommoditySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Commodity', CommoditySchema)
