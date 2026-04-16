import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null); 
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) setUser(loggedInUser);

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-theme');
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };
    updateCartCount();
    window.addEventListener("cartUpdate", updateCartCount);
    return () => window.removeEventListener("cartUpdate", updateCartCount);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  // --- Dynamic Color for Names ---
  const activeTextColor = darkMode ? '#ffffff' : '#333333';

  const handleAuth = () => {
    if (user) {
      if (window.confirm("Do you want to logout?")) {
        localStorage.removeItem('user');
        setUser(null);
        alert("Logged out successfully!");
        window.location.reload();
      }
    } else {
      const name = prompt("Enter your Name:");
      const rollNo = prompt("Enter your Roll Number:");
      if (name && rollNo) {
        const userData = { name, rollNo };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        alert("Sign In Successful! Now you can sell products.");
        window.location.reload();
      }
    }
  };

  return (
    <header className="navbar" style={{ backgroundColor: darkMode ? '#1a202c' : '#ffffff' }}>
      <div className="logo">
        <Link to="/" style={{ color: activeTextColor }}>Campus Services</Link>
      </div>
      <nav className="nav-links">
        <Link to="/" style={{ color: activeTextColor }}>🏠 Home</Link>
        <Link to="/products" style={{ color: activeTextColor }}>🛍️ Buy</Link>
        <Link to="/wishlist" style={{ color: activeTextColor }}>❤️ Wishlist</Link>
        <Link to="/sell" style={{ color: activeTextColor }}>➕ Sell</Link>
      </nav>
      <div className="nav-actions">
        <button onClick={toggleDarkMode} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}>
          {darkMode ? <FaSun color="#f6e05e" /> : <FaMoon color="#4a5568" />}
        </button> 

        <Link to="/cart" className="cart-wrapper">
          <span className="cart-icon">🛒</span>
          <span className="badge">{cartCount}</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user && (
            <span style={{ color: darkMode ? '#63b3ed' : '#1E3A8A', fontWeight: 'bold', fontSize: '14px' }}>
              Hi, {user.name} 👋
            </span>
          )}
          <button className="signin-btn" onClick={handleAuth}>
            {user ? "Logout" : "Sign In"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
