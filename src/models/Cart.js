//  (user, product, quantity, price)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
  //    (user, product, quantity, price),

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: 'Please enter the required quantity',
      },
    },
  ],
})

module.exports = mongoose.model('Cart', CartSchema)
