 import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaBolt, FaArrowLeft, FaShareAlt, FaShieldAlt, FaTruck } from 'react-icons/fa';

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [isOrdered, setIsOrdered] = useState(false);
  // Dark mode checking for text visibility
  const isDarkMode = document.body.classList.contains('dark-theme');

  if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Product Not Found!</div>;

  const finalSellerName = product?.sellerName || "Campus Seller";

  // --- Chat with Seller ---
  const handleChat = () => {
    const phoneNumber = product?.sellerPhone || "919876543210"; 
    const message = `Hi ${finalSellerName}, I am interested in: ${product.name}. Is it available?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // --- Add to Cart Logic (Fixed) ---
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // MongoDB _id leda static id renditini check chestundi
    const isItemInCart = cart.some(item => (item._id === product._id) || (item.id === product.id));

    if (!isItemInCart) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdate")); // Navbar count update kosam
      alert(`${product.name} added to Cart!`);
    } else {
      alert("Item already in Cart!");
    }
  };

  // --- Buy Now Logic ---
  const handleBuyNow = () => {
    setIsOrdered(true);
    setTimeout(() => {
      alert(`Order Placed! Please contact ${finalSellerName} for pickup.`);
      setIsOrdered(false);
      navigate('/products');
    }, 1500);
  };

  // Dynamic Text Color for Dark Mode
  const textColor = isDarkMode ? '#ffffff' : '#1a202c';
  const subTextColor = isDarkMode ? '#cbd5e0' : '#4a5568';
  const cardBg = isDarkMode ? '#2d3748' : '#f8fafc';

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '80px auto 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => navigate(-1)} style={{...backBtnStyle, color: subTextColor}}><FaArrowLeft /> Back</button>
        <button onClick={() => {/* Share logic */}} style={shareCircleStyle}><FaShareAlt /></button>
      </div>

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '350px' }}>
          <div style={imageContainerStyle}>
            <img src={product.image} alt={product.name} style={mainImageStyle} />
          </div>
        </div>

        <div style={{ flex: '1.2', minWidth: '350px' }}>
          <span style={categoryTagStyle}>{product.category}</span>
          <h1 style={{ fontSize: '32px', margin: '10px 0', color: textColor }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={priceStyle}>₹{product.price}</span>
            {product.save && <span style={saveTagStyle}>Save ₹{product.save}</span>}
          </div>

          <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />

          <div style={{...sellerCardStyle, background: cardBg}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <FaUserCircle size={45} color="#A0AEC0" />
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#718096' }}>Verified Seller</p>
                <h4 style={{ margin: 0, fontSize: '18px', color: textColor }}>{finalSellerName}</h4>
              </div>
            </div>
            <button style={contactBtnStyle} onClick={handleChat}>Chat with Seller</button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <p style={{...infoTextStyle, color: subTextColor}}><FaTruck color="#3182ce" /> Delivery: <b>Within 24 Hours</b></p>
            <p style={{...infoTextStyle, color: subTextColor}}><FaShieldAlt color="#38a169" /> Safety: <b>Meet on Campus</b></p>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button onClick={addToCart} style={cartBtnStyle}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={handleBuyNow} style={buyBtnStyle} disabled={isOrdered}>
              {isOrdered ? "Processing..." : <><FaBolt /> Get Service</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Existing Styles (Modified for responsiveness) ---
const backBtnStyle = { border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' };
const shareCircleStyle = { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5568' };
const imageContainerStyle = { background: '#fff', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' };
const mainImageStyle = { width: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '15px' };
const categoryTagStyle = { background: '#ebf4ff', color: '#2b6cb0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' };
const priceStyle = { fontSize: '36px', fontWeight: '800', color: '#1E3A8A' };
const saveTagStyle = { background: '#f0fff4', color: '#38a169', padding: '4px 10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' };
const sellerCardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '16px', border: '1px solid #edf2f7' };
const contactBtnStyle = { background: '#fff', border: '1px solid #cbd5e0', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' };
const infoTextStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', marginBottom: '8px' };
const cartBtnStyle = { flex: 1, padding: '16px', borderRadius: '12px', border: '2px solid #1E3A8A', background: '#fff', color: '#1E3A8A', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const buyBtnStyle = { flex: 1, padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };

export default ProductDetails;