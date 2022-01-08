const Product = require('../models/product')
exports.getProducts = (req, res) => {
  Product.findById()
    .then((products) => {
      res.status(200).send({
        status: 'sucess',
        message: products,
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get products',
      })
    })
}
