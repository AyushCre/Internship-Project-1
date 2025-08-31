// src/pages/ProductDetailPage.jsx

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError('')
      try {
        // FIX: Use relative path to allow Vite proxy to work
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) throw new Error('Product not found')
        const json = await res.json()
        setProduct(json)
      } catch (e) {
        setError(e.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <Loader />
  if (error) return <Message type="error">{error}</Message>
  if (!product) return null

  return (
    <div className="product-detail">
      <Link to="/">← Back</Link>
      <div className="detail-body">
        <img src={product.image} alt={product.name} />
        <div className="info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Rating:</strong> ⭐ {product.rating.toFixed(1)} ({product.numReviews} reviews)</p>
          <p><strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <button disabled={product.countInStock === 0}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}