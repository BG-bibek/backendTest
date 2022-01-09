const User = require('../models/User')
const { validationResult } = require('express-validator')
exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send({
        status: 'success',
        message: users,
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get users',
      })
    })
}

exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(200).send({
        status: 'success',
        message: 'User account created successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: error.message,
      })
    })
}

exports.getUserById = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      if (user) {
        res.status(200).send({
          status: 'success',
          message: user,
        })
      } else {
        res.status(400).send({
          status: 'error',
          message: 'failed to get user account',
        })
      }
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to get user account',
      })
    })
}

exports.updateUserById = (req, res) => {
  const id = req.params.id
  console.log(req.body)
  User.findById({ _id: id })
    .then((user) => {
      user
        .updateOne(req.body)
        .then(() => {
          res.status(200).send({
            status: 'success',
            message: 'User account updated sucessfully',
          })
        })
        .catch((error) => {
          res.status(400).send({
            status: 'error',
            message: 'failed to update User account',
          })
        })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'Cannot find User account',
      })
    })
}

exports.deleteUserById = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((user) => {
      res.status(200).send({
        status: 'Success',
        message: 'User account deleted successfully',
      })
    })
    .catch((error) => {
      res.status(400).send({
        status: 'error',
        message: 'failed to delete User account',
      })
    })
}

exports.signup = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    })
  }
  const user = new User(req.body)
  user
    .save()
    .then((newUser) => {
      res.status(200).send({
        status: 'success',
        message: newUser,
      })
    })
    .catch((err) => {
      res.status(400).send({
        status: 'error',
        message: 'Unable to add user',
      })
    })
}
