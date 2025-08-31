import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('keyword', search.trim())
    navigate(`//?${params.toString()}`)
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">ECommerce</Link>
        <form onSubmit={onSubmit} className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  )
}
