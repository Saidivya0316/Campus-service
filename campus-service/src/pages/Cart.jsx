import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [finalPrice, setFinalPrice] = useState(0); // Order tharvatha price store cheyadaniki

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(data);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdate", loadCart);
    return () => window.removeEventListener("cartUpdate", loadCart);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    
    setFinalPrice(totalPrice); // Invoice kosam current price ni save chestunnam
    setOrderID('CC-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    setIsOrdered(true);
    
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event("cartUpdate"));
  };

  // 1. MODERN ORDER SUCCESS PAGE
  if (isOrdered) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '70px', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ color: '#1E3A8A' }}>Order Placed Successfully!</h1>
        
        <div style={{ 
          background: '#fff', border: '1px dashed #1E3A8A', borderRadius: '15px', 
          padding: '30px', marginTop: '30px', textAlign: 'left', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold', color: '#1E3A8A' }}>INVOICE</span>
            <span style={{ color: '#888' }}>ID: {orderID}</span>
          </div>
          <hr style={{ border: '0.5px solid #eee' }} />
          
          <div style={{ margin: '20px 0', fontSize: '18px' }}>
             <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color:'black' }}>
              
               Total Paid Amount: <span style={{ color: '#1E3A8A' }}>₹{finalPrice}</span>
             </p>
             <p style={{ fontSize: '14px', color: 'green', marginTop: '5px' }}>✓ Payment Secured</p>
          </div>
          
          <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#aaa' }}>
            Thank you for shopping with Campus Service!
          </p>
        </div>

        <button 
          onClick={() => window.location.href = '/'} 
          style={{ 
            marginTop: '30px', padding: '12px 30px', background: '#1E3A8A', color: 'white', 
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', minHeight: '80vh', textAlign: 'center' }}>
      
      {/* 1. Cart Icon Heading Paina */}
      <div style={{ fontSize: '60px', marginBottom: '10px' }}>🛒</div>
      <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{
              border: '1px solid #eee', padding: '20px', borderRadius: '12px',
              background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                <div style={{ flex: '1' }}>
                  <h3 style={{ margin: '0' }}>{item.name}</h3>
                  <p style={{ color: '#1E3A8A', fontWeight: 'bold', fontSize: '18px', margin: '5px 0' }}>₹{item.price}</p>
                </div>
                <button onClick={() => {
                  const updatedCart = cartItems.filter(i => i.id !== item.id);
                  localStorage.setItem('cart', JSON.stringify(updatedCart));
                  window.dispatchEvent(new Event("cartUpdate"));
                }} style={{
                  background: '#fff1f1', border: '1px solid #ff4d4d', color: '#ff4d4d',
                  padding: '8px 12px', borderRadius: '8px', cursor: 'pointer'
                }}>Remove 🗑️</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px', padding: '25px', borderRadius: '12px', background: '#1E3A8A', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Total Amount: ₹{totalPrice}</h3>
            <button onClick={handleCheckout} style={{
              width: '100%', padding: '15px', background: '#fff', color: '#1E3A8A',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'
            }}>
              Checkout & Generate Invoice
            </button>
          </div>
        </div>
      ) : (
        /* 2. MODERN EXPLORE PRODUCTS BUTTON */
        <div style={{ marginTop: '50px', padding: '40px', background: '#fdfdfd', borderRadius: '20px', border: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: '20px', color: '#888', marginBottom: '25px' }}>Your cart is empty!</p>
          <button 
            onClick={() => window.location.href='/products'} 
            style={{ 
              padding: '15px 40px', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#fff', 
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', 
              border: 'none', 
              borderRadius: '50px', 
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🚀 Explore Services
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;