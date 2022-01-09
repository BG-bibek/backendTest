const Cart = require('../models/Cart')

exports.getCart = (req, res) => {
  Cart.find()
    .then((cart) => {
      res.status(200).send({
        status: 'success',
        message: cart,
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get Cart',
      })
    })
}

exports.createCart = (req, res) => {
  Cart.findOne({ user: req.body.user }).then((cart) => {
    console.log(cart)
    if (cart) {
      const currentProducts = cart.products
      const newProducts = req.body.products
      const products = []
      currentProducts.map((product) => {
        newProducts.map((item) => {
          if (product._id == item._id) {
            products.push({
              product: product._id,
              qauntity: product.qauntity + item.qauntity,
            })
          } else {
            products.push(item)
          }
        })
      })
      req.body.products = products
      Cart.updateOne(req.body).then(() => {
        res
          .status(200)
          .send({
            status: 'Success',
            message: 'Product added to cart successfully',
          })
          .catch((error) => {
            res.status(500).send({
              status: 'error',
              message: 'Product Cannot be added',
            })
          })
      })
    } else {
      console.log(req.body)
      Cart.create(req.body)
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'cart created successfully',
          })
        })
        .catch((error) => {
          res.status(400).send({
            status: 'error',
            message: error.message,
          })
        })
    }
  })
}

exports.getCartById = (req, res) => {
  Cart.findById({ _id: req.params.id })
    .populate('user')
    .populate('products.product')
    .then((cart) => {
      if (cart) {
        res.status(200).send({
          status: 'success',
          message: cart,
        })
      } else {
        res.status(400).send({
          status: 'error',
          message: 'failed to get cart',
        })
      }
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get Cart',
      })
    })
}

exports.updateCartById = (req, res) => {
  const id = req.params.id
  console.log(req.body)
  Cart.findById({ _id: id })
    .then((cart) => {
      cart
        .updateOne(req.body)
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'cart  updated sucessfully',
          })
        })
        .catch((error) => {
          res.status(400).send({
            status: 'error',
            message: 'failed to update Cart account',
          })
        })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'Cannot find Cart account',
      })
    })
}

exports.deleteCartById = (req, res) => {
  Cart.findByIdAndDelete({ _id: req.params.id })
    .then((cart) => {
      res.status(200).send({
        status: 'Success',
        message: 'cart account deleted successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to delete cart account',
      })
    })
}
