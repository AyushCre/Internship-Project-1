import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

const apiBase = 'http://localhost:5001'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({ products: [], page: 1, pages: 1, total: 0 })

  const page = Number(searchParams.get('page') || 1)
  const keyword = searchParams.get('keyword') || ''
  const category = searchParams.get('category') || 'All Categories'
  const sort = searchParams.get('sort') || 'newest'

  const query = useMemo(() => {
    const p = new URLSearchParams()
    if (keyword) p.set('keyword', keyword)
    if (category && category !== 'All Categories') p.set('category', category)
    if (sort) p.set('sort', sort)
    p.set('page', page)
    p.set('limit', 8)
    return p.toString()
  }, [keyword, category, sort, page])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${apiBase}/api/products?${query}`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [query])

  const categories = ['All Categories', 'Electronics', 'Mobiles', 'Gaming']

  const updateParam = (key, value) => {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value)
    else p.delete(key)
    if (key !== 'page') p.set('page', '1')
    setSearchParams(p)
  }

  return (
    <div>
      <div className="filters">
        <select value={category} onChange={(e) => updateParam('category', e.target.value)}>
          <option value="All Categories">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {loading && (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="product-card" style={{ opacity: 0.6 }}>
              <div style={{ background:'#e2e8f0', height:160, borderRadius:8 }} />
              <div style={{ height:14 }} />
              <div style={{ background:'#e2e8f0', height:16, borderRadius:6, width:'70%' }} />
              <div style={{ height:10 }} />
              <div style={{ background:'#e2e8f0', height:14, borderRadius:6, width:'50%' }} />
            </div>
          ))}
        </div>
      )}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <div className="grid">
          {data.products.length === 0 ? (
            <p style={{ gridColumn:'1/-1', textAlign:'center' }}>No products found.</p>
          ) : (
            data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={p === data.page ? 'active' : ''}
            onClick={() => updateParam('page', String(p))}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
