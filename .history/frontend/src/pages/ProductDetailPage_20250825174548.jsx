import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const apiBase = 'http://localhost:5000'

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
        const res = await fetch(`${apiBase}/api/products/${id}`)
        if (!res.ok) throw new Error('Not found')
        const json = await res.json()
        setProduct(json)
      } catch (e) {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>
  if (!product) return null

  return (
    <div className="product-detail">
      <Link to="/">← Back</Link>
      <div className="detail-body">
        <img src={product.image} alt={product.name} />
        <div className="info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Rating: ⭐ {product.rating.toFixed(1)} ({product.numReviews})</p>
          <button disabled={product.countInStock === 0}>
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}
