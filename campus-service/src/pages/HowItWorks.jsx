import React from 'react';

const HowItWorks = () => {
  return (
    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
      <h1>How Campus Service Works 🚀</h1>
      <div className="steps-grid">
        <div className="step-card">
          <h3>1. Sign In</h3>
          <p>Register with your college roll number to start.</p>
        </div>
        <div className="step-card">
          <h3>2. List or Browse</h3>
          <p>Post your old items or find what you need from others.</p>
        </div>
        <div className="step-card">
          <h3>3. Chat & Meet</h3>
          <p>Chat with the seller and meet at safe campus spots.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;