import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaShareAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 1. Navigation kosam import

const ProductCard = ({ product, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentUserRoll, setCurrentUserRoll] = useState(null);
  const navigate = useNavigate(); // 2. Navigate initialize

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setCurrentUserRoll(loggedInUser.rollNo);
    }
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsLiked(savedWishlist.some(item => item.id === product.id));
  }, [product.id]);

  // --- NEW: Share Logic ---
  const handleShare = (e) => {
    e.stopPropagation(); // Card click trigger avvakunda
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} on CampusCircle!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop navigation
    let savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (isLiked) {
      savedWishlist = savedWishlist.filter(item => item.id !== product.id);
    } else {
      savedWishlist.push(product);
    }
    localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
    setIsLiked(!isLiked);
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop navigation
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isItemInCart = cart.some(item => item.id === product.id);
    if (!isItemInCart) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to Cart!`);
      window.dispatchEvent(new Event("cartUpdate"));
    } else {
      alert("Item already in Cart!");
    }
  };

  const isOwner = currentUserRoll === product.sellerRoll;
  return (
    <div 
      className="product-card" 
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => navigate(`/product/${product.id}`, { state: { product } })} // 3. Details page navigation
    >
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-img" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
        {product.offer && <span className="offer-tag">{product.offer}</span>}
        
        <div className="card-actions">
          <button className="action-btn" onClick={toggleWishlist}>
            {isLiked ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
          </button>
          
          {/* --- Updated Share Button --- */}
          <button className="action-btn" onClick={handleShare}>
            <FaShareAlt />
          </button>
          
         {isOwner && onDelete && (
  <button 
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.confirm("Delete this product?")) {
        onDelete(product._id || product.id);
      }
    }}
  
              style={{
                background: '#fff1f1',
                color: '#ff4d4d',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: '1px solid #ffcccc'
              }}
            >
              <FaTrash size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="product-info">
        <h4 className="product-title">{product.name}</h4>
        
        {product.isUserAdded && (
          <p style={{ fontSize: '10px', color: '#888', margin: '0 0 5px' }}>
            Seller: {product.sellerName}
          </p>
        )}

        <div className="price-row">
          <div className="price-details">
            <span className="current-price">₹{product.price}</span>
            {product.save && <span className="save-amount">Save ₹{product.save}</span>}
          </div>
          <button className="add-btn" onClick={addToCart}><FaPlus /></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;