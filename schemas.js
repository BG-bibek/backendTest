const Joi = require('joi')

module.exports.productSchema = Joi.object({
  //  title: String,
  //   price: Number,
  //   color: String,
  //   description: String,
  //   size: String,
  //   stock: Number,
  //   material: String,
  //   picture: String,
  product: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    color: Joi.string().required(),
    description: Joi.string().required(),
    size: Joi.string().required(),
    stock: Joi.number().required().min(0),
    material: Joi.string().required(),
    picture: Joi.string().required(),
  }).required(),
})
