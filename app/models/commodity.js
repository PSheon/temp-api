const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const CommoditySchema = new mongoose.Schema(
  {
    commodityId: {
      type: String,
      validate: {
        validator: validator.isAlphanumeric,
        message: 'COMMODITY_ID_ONLY_ACCEPT_ALPHA_NUMERIC'
      },
      lowercase: true
    },
    title: {
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
