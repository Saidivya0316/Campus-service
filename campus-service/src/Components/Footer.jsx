import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Campus Service</h2>
          <p>The smartest way to buy and sell in campus. Built for real college life in India.</p>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Browse Services</a></li>
            <li><a href="/sell">Post an Item</a></li>
            <li><a href="/how-it-works">How it Works</a></li>
            <li><a href="/request-item">Request Item</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Connect</h4>
          <p>Email: saidivyamaddila1116@gmail.com</p>
          <div className="social-links">
            <a href="https://www.instagram.com/campus_service123?igsh=MTMwa29yNzQyaG12NQ==">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Campus Service. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;