const Category = require('../models/Category')
exports.getCategory = (req, res) => {
  Category.find()
    .then((category) => {
      res.status(200).send({
        status: 'success',
        message: category,
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get Categories',
      })
    })
}

exports.createCategory = (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).send({
        status: 'success',
        message: 'Category created successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: error.message,
      })
    })
}

exports.getCategoryById = (req, res) => {
  Category.findById({ _id: req.params.id })
    .then((category) => {
      if (category) {
        res.status(200).send({
          status: 'success',
          message: category,
        })
      } else {
        res.status(400).send({
          status: 'error',
          message: 'failed to get Category',
        })
      }
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get Category',
      })
    })
}

exports.updateCategoryById = (req, res) => {
  const id = req.params.id
  console.log(req.body)
  Category.findById({ _id: id })
    .then((category) => {
      category
        .updateOne(req.body)
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'category  updated sucessfully',
          })
        })
        .catch((error) => {
          res.status(400).send({
            status: 'error',
            message: 'failed to update Category account',
          })
        })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'Cannot find Category account',
      })
    })
}

exports.deleteCategoryById = (req, res) => {
  Category.findByIdAndDelete({ _id: req.params.id })
    .then((category) => {
      res.status(200).send({
        status: 'Success',
        message: 'category account deleted successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to delete category account',
      })
    })
}
