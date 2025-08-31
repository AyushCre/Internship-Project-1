// src/components/Header.jsx

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Header() {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  const [searchTerm, setSearchTerm] = useState(keyword)
  const navigate = useNavigate()

  useEffect(() => {
    setSearchTerm(keyword)
  }, [keyword])

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      if (searchTerm.trim()) {
        params.set('keyword', searchTerm.trim())
      } else {
        params.delete('keyword')
      }
      navigate(`/?${params.toString()}`)
    }, 400)
    return () => clearTimeout(handler)
  }, [searchTerm])

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">ECommerce</Link>
        <form className="search" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </header>
  )
}