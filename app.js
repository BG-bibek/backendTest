const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
// const Product = require('./src/models/product')
const Joi = require('joi')
const { productSchema } = require('./schemas')
const rootRouter = require('./src/routes/index.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { cookie } = require('express/lib/response')

mongoose.connect('mongodb://localhost:27017/backend-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
)
//cross origin plateform
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
  // res.json({data: [1, 2, 3, 4]})
})

app.use(cookieParser())

app.use(methodOverride('_method'))
app.use('/api/v1', rootRouter)

// const validateProduct = (req, res, next) => {
//   const { error } = productSchema.validate(req.body)
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(',')
//     throw new ExpressError(msg, 400)
//   } else {
//     next()
//   }
// }

// app.get('/', (req, res) => {
//   res.render('home')
// })

// app.get(
//   '/products',
//   catchAsync(async (req, res) => {
//     const products = await Product.find({})
//     res.render('products/index', { products })
//   })
// )

// app.get(
//   '/makeProduct',
//   catchAsync(async (req, res) => {
//     const prod = new Product({
//       title: 'this is testing ',
//       description: 'sasto ramro',
//     })
//     await prod.save()
//     res.send(prod)
//   })
// )

// app.get('/products/new', (req, res) => {
//   res.render('products/new')
// })

// app.post(
//   '/products',
//   validateProduct,
//   catchAsync(async (req, res, next) => {
//     const product = new Product(req.body.product)
//     await product.save()
//     res.redirect(`/products/${product._id}`)
//   })
// )

// app.get(
//   '/products/:id',
//   catchAsync(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     res.render('products/show', { product })
//   })
// )

// //update
// app.get(
//   '/products/:id/edit',
//   catchAsync(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     res.render('products/edit', { product })
//   })
// )

// app.put(
//   '/products/:id',
//   validateProduct,
//   catchAsync(async (req, res) => {
//     // res.send('It ')
//     const { id } = req.params
//     const product = await Product.findByIdAndUpdate(id, { ...req.body.product })
//     // product.save()
//     res.redirect(`/products/${product._id}`)
//   })
// )

// app.delete(
//   '/products/:id',
//   catchAsync(async (req, res) => {
//     const { id } = req.params
//     await Product.findByIdAndDelete(id)
//     res.redirect('/products')
//   })
// )

// app.all('*', (req, res, next) => {
//   next(new ExpressError('Page Not Found', 404))
// })

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = 'Something went wrong' } = err
//   res.status(statusCode).send(message)
// })

app.listen(3000, () => {
  console.log('Serving on portal 3000')
})
