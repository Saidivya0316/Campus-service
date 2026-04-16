import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestItem = () => {
  const [request, setRequest] = useState({ itemName: '', description: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // User details tiskuntunnam (Login unte)
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    
    const newRequest = {
      ...request,
      id: Date.now(),
      userName: loggedInUser ? loggedInUser.name : "Student",
      date: new Date().toLocaleDateString()
    };

    // LocalStorage lo save cheyadam
    const existingRequests = JSON.parse(localStorage.getItem('itemRequests')) || [];
    localStorage.setItem('itemRequests', JSON.stringify([newRequest, ...existingRequests]));

    alert(`Success! Your request for "${request.itemName}" has been posted. Sellers will see it on the Buy page.`);
    
    setRequest({ itemName: '', description: '' });
    navigate('/products'); // Direct ga Buy page ki tesukelthundi
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: '#1E3A8A' }}>Can't find what you're looking for? 🔍</h2>
        <p style={{ color: '#666' }}>Post a request and let the campus community know!</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ 
        background: '#fff', padding: '30px', borderRadius: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0',
        display: 'flex', flexDirection: 'column', gap: '15px' 
      }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Item Name</label>
          <input 
            type="text" 
            placeholder="e.g. Drafter, Lab Coat, M3 Textbook" 
            value={request.itemName}
            onChange={(e) => setRequest({...request, itemName: e.target.value})}
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Short Description</label>
          <textarea 
            placeholder="Tell us more (e.g. Need it for 1st sem, any condition is fine)" 
            value={request.description}
            onChange={(e) => setRequest({...request, description: e.target.value})}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', height: '100px', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>

        <button type="submit" className="signin-btn" style={{ width: '100%', padding: '15px' }}>
          Post Request 🚀
        </button>
      </form>
    </div>
  );
};

export default RequestItem;