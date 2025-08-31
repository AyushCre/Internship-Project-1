import { Routes, Route, Link, useSearchParams } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
