const Order = require('../models/Order')

// for all the orders
exports.getOrders = (req, res) => {
  Order.find()
    .then((orders) => {
      res.status(200).send({
        status: 'success',
        message: orders,
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get orders',
      })
    })
}

//to create order
exports.createOrder = (req, res) => {
  Order.create(req.body)
    .then((order) => {
      res.status(200).send({
        status: 'success',
        message: 'Order created successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: error.message,
      })
    })
}

//to find by ID
exports.getOrderById = (req, res) => {
  Order.findById({ _id: req.params.id })
    .then((order) => {
      if (order) {
        res.status(200).send({
          status: 'success',
          message: order,
        })
      } else {
        res.status(400).send({
          status: 'error',
          message: 'failed to get order',
        })
      }
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get order',
      })
    })
}

exports.updateOrderById = (req, res) => {
  const id = req.params.id
  console.log(req.body)
  Order.findById({ _id: id })
    .then((order) => {
      order
        .updateOne(req.body)
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'order updated sucessfully',
          })
        })
        .catch((error) => {
          res.status(400).send({
            status: 'error',
            message: 'failed to update Order',
          })
        })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'Cannot find Order',
      })
    })
}

exports.deleteOrderById = (req, res) => {
  Order.findByIdAndDelete({ _id: req.params.id })
    .then((order) => {
      res.status(200).send({
        status: 'Success',
        message: 'order deleted successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to delete order ',
      })
    })
}
