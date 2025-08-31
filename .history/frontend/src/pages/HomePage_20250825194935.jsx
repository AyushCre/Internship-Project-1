import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search, Filter, Sort ke liye state
  const [searchTerm, setSearchTerm] = useState(''); // User jo type kar raha hai
  const [keyword, setKeyword] = useState('');     // Final keyword jo API ko bhejna hai
  const [category, setCategory] = useState('All Categories');
  const [sort, setSort] = useState('newest');

  // Debouncing ke liye useEffect
  useEffect(() => {
    const timerId = setTimeout(() => {
      // Jab user 500ms (aadha second) tak type karna band kar de, tab keyword ko set karo
      setKeyword(searchTerm);
    }, 500);

    // Cleanup function: agar user fir se type kare, toh purana timer clear kar do
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]); // Yeh effect tab chalega jab searchTerm badlega

  // API call ke liye useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5174/api/products?keyword=${keyword}&category=${category}&sort=${sort}`
        );
        console.log(data.products); // Debugging log to check the products array
        setProducts(data.products); // Ensure we are setting the products array
        setLoading(false);
      } catch (err) {
        setError('Products load nahi ho paaye. Server check karein.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category, sort]); // Jab final keyword, category, ya sort badlega, tab API call hogi

  return (
    <div>
      <h1>Latest Products</h1>

      <div className="filter-bar">
        <div className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All Categories">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Footwear">Footwear</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <Message>No Products Found</Message>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;