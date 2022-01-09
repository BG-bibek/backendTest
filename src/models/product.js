const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  // (name, price, color,
  // description, size, stock (number), material, picture
  title: {
    type: String,
    required: 'please provide title',
  },
  price: {
    type: Number,
    required: 'please provide valid price',
  },
  color: [String],
  description: {
    type: String,
    required: 'please provide product description',
  },
  size: [String],
  stock: {
    type: Number,
    required: 'please provide valid Number',
  },
  material: String,
  picture: [String],
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
})

module.exports = mongoose.model('Product', ProductSchema)
