import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String },
    category: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', brand: 'text', description: 'text' })

export const Product = mongoose.model('Product', productSchema)
