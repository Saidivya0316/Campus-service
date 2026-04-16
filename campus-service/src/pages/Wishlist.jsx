import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Navigation kosam idhi import cheyali
import ProductCard from '../Components/ProductCard';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate(); // 2. Navigate function ni initialize cheyali

  const loadWishlist = () => {
    const data = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(data);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlistUpdate", loadWishlist);
    return () => window.removeEventListener("wishlistUpdate", loadWishlist);
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center', minHeight: '60vh' }}>
      {/* 1. Heart Symbol paina */}
      <div style={{ fontSize: '50px', marginBottom: '10px' }}>❤️</div>
      
      {/* 2. My Wishlist Title dhani kindha */}
      <h1 style={{ marginBottom: '20px' }}>My Wishlist</h1>
      
      <div style={{ marginTop: '20px', color: '#666' }}>
        {wishlistItems.length > 0 ? (
          <div className="product-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px', 
            textAlign: 'left',
            marginTop: '30px' 
          }}>
            {wishlistItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <p>Your wishlist is currently empty.</p>
            
            {/* 3. Explore Products Button - Dheenini click chesthe Buy page ki velthundhi */}
            <button 
              className="btn-primary" 
              style={{ marginTop: '20px', cursor: 'pointer' }}
             onClick={() => navigate('/products')}
            >
              Explore Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;