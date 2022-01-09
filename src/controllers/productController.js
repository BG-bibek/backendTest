const Product = require('../models/Product')
exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).send({
        status: 'success',
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

exports.createProduct = (req, res) => {
  Product.create(req.body)
    .then((product) => {
      res.status(200).send({
        status: 'success',
        message: 'product created successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: error.message,
      })
    })
}

exports.getProductById = (req, res) => {
  Product.findById({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.status(200).send({
          status: 'success',
          message: product,
        })
      } else {
        res.status(400).send({
          status: 'error',
          message: 'failed to get product',
        })
      }
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get product',
      })
    })
}

exports.updateProductById = (req, res) => {
  const id = req.params.id
  console.log(req.body)
  Product.findById({ _id: id })
    .then((product) => {
      product
        .updateOne(req.body)
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'Product updated sucessfully',
          })
        })
        .catch((error) => {
          res.status(400).send({
            status: 'error',
            message: 'failed to update products',
          })
        })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'Cannot find product',
      })
    })
}

exports.deleteProductById = (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id })
    .then((product) => {
      res.status(200).send({
        status: 'Success',
        message: 'Product deleted successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to delete product',
      })
    })
}
