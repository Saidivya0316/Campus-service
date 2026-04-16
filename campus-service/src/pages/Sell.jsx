import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios ni install chesko: npm install axios

const Sell = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    sellerPhone: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedInUser) {
      alert("Please Sign In to post this product.");
      return;
    }

    const newProduct = { 
      ...product, 
      price: Number(product.price),
      isUserAdded: true,
      sellerName: loggedInUser.name,     
      sellerRoll: loggedInUser.rollNo
    };

    try {
      // Backend API call ikkada jarugutundi
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      
      if (response.status === 201 || response.status === 200) {
        alert("Product Added Successfully to Database! 🚀");
        navigate('/products');
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Backend connect avvaledu. Check your Server!");
    }
  };

  const inputStyle = { 
    width: '100%', padding: '12px', borderRadius: '8px', 
    border: '1px solid #ddd', boxSizing: 'border-box' 
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Sell Product</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required style={inputStyle} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Product Name</label>
          <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} required style={inputStyle} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>WhatsApp Number</label>
          <input type="tel" value={product.sellerPhone} onChange={(e) => setProduct({...product, sellerPhone: e.target.value})} required style={inputStyle} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} required style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
            I confirm product is in good condition
          </label>
        </div>

        <button type="submit" disabled={!agreed} style={{
          width: '100%', padding: '15px', background: agreed ? '#1E3A8A' : '#ccc',
          color: 'white', border: 'none', borderRadius: '10px'
        }}>
          Post Product 🚀
        </button>
      </form>
    </div>
  );
};

export default Sell;