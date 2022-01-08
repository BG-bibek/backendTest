const { number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  // (name, price, color,
  // description, size, stock (number), material, picture
  title: String,
  price: Number,
  color: String,
  description: String,
  size: String,
  stock: Number,
  material: String,
  picture: String,
})

module.exports = mongoose.model('Product', ProductSchema)
