const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const orderController = require('../controllers/orderController')
const categoryController = require('../controllers/categoryController')
const cartController = require('../controllers/cartController')
const { check } = require('express-validator')

//Product api
router.get('/products', productController.getProducts)

router.post('/product', productController.createProduct)

router
  .route('/product/:id')
  .get(productController.getProductById)
  .put(productController.updateProductById)
  .delete(productController.deleteProductById)

//user api
router.get('/users', userController.getUsers)

// router.post('/user', userController.createUser)
router.post(
  '/signup',
  [
    check('name', 'Name atleast should be 3 characters').isLength({ min: 3 }),
    check('email', 'Email should be valid').isEmail(),
    check('password', 'Password at least should be 6 characters').isLength({
      min: 6,
    }),
  ],
  userController.signup
)

router
  .route('/user/:id')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById)

// order api

router.get('/orders', orderController.getOrders)
router.post('/order', orderController.createOrder)
router
  .route('/order/:id')
  .get(orderController.getOrderById)
  .put(orderController.updateOrderById)
  .delete(orderController.deleteOrderById)

// category api

router.get('/category', categoryController.getCategory)
router.post('/category', categoryController.createCategory)
router
  .route('/category/:id')
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById)

// Cart api

router.get('/cart', cartController.getCart)
router.post('/cart', cartController.createCart)
router
  .route('/cart/:id')
  .get(cartController.getCartById)
  .put(cartController.updateCartById)
  .delete(cartController.deleteCartById)

module.exports = router
