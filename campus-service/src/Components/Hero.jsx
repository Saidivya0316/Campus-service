import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
 const navigate = useNavigate();
const pStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '20px auto 30px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '400'
  }
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Buy and Sell Easily in Your Campus</h1>
        <p style={pStyle} className="hero-p">
          Campus Service is a student marketplace in India where students buy and sell 
          in campus for books, electronics, stationery,and hostel essentials at fair prices.
        </p>  
        
        <div className="hero-buttons">
          <button 
            className="btn-primary" 
            onClick={() => navigate('/products')}
          >
            Browse Services
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => navigate('/sell')}
          >
            Sell
          </button>
        </div>
      </div>
      
      {/* Optional: Visual Element like a subtle background shape */}
      <div className="hero-bg-accent"></div>
    </section>
  );
};

export default Hero;