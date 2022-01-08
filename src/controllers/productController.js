const Product = require('../models/product')
exports.getProducts = async (req, res) => {
  const product = await Product.findById(req.params.id)
}
