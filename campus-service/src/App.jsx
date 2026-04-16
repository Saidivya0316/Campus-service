import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import HowItWorks from './pages/HowItWorks';
import RequestItem from './pages/RequestItem';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Buy />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/request-item" element={<RequestItem />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;