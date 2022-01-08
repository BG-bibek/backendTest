const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  // (name, price, color,
  // description, size, stock (number), material, picture
  title: String,
  price: String,
  color: String,
  description: String,
  size: String,
})

module.exports = mongoose.model('Product', ProductSchema)
