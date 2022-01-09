const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  //   (user, product, price, billing_shipping detail, etc)

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quanlity: Number,
    },
  ],
  total_price: Number,
  billing_shipping_detail: String,
})

module.exports = mongoose.model('Order', OrderSchema)
