import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className="meta">
        <span className="price">${product.price.toFixed(2)}</span>
        <span className="rating">⭐ {product.rating.toFixed(1)}</span>
      </div>
    </div>
  )
}
