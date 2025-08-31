import { Product } from '../models/productModel.js'

// GET /api/products
export const getProducts = async (req, res) => {
  const pageSize = Number(req.query.limit) || 8
  const page = Number(req.query.page) || 1
  const keyword = req.query.keyword?.trim()
  const category = req.query.category?.trim()
  const sort = req.query.sort || 'newest'

  const query = {}
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ]
  }
  if (category) {
    query.category = category
  }

  const total = await Product.countDocuments(query)

  let sortOption = { createdAt: -1 }
  if (sort === 'price_low_high') sortOption = { price: 1 }
  if (sort === 'price_high_low') sortOption = { price: -1 }
  if (sort === 'rating') sortOption = { rating: -1 }

  const products = await Product.find(query)
    .sort(sortOption)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    pages: Math.ceil(total / pageSize),
    total
  })
}

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
}
