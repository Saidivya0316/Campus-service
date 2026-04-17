import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // ✅ Use shared API instance (uses Vite proxy locally, Nginx on EC2)

const Sell = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
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

    console.log("📦 Submitting product:", newProduct); // Debug log

    try {
      setLoading(true);
      // ✅ Uses API instance → routed via Vite proxy (local) or Nginx (EC2)
      const response = await API.post('/products', newProduct);
      console.log("✅ Server response:", response.data);

      if (response.status === 201 || response.status === 200) {
        alert("Product Added Successfully to Database! 🚀");
        navigate('/products');
      }
    } catch (error) {
      console.error("❌ Error adding product:", error);
      if (error.response) {
        // Server responded with error status
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        alert(`Server Error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request made but no response (network / CORS / server down)
        alert("❌ Cannot reach server. Is the backend running? Check port 5000.");
      } else {
        alert("❌ Request failed: " + error.message);
      }
    } finally {
      setLoading(false);
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

        <button type="submit" disabled={!agreed || loading} style={{
          width: '100%', padding: '15px',
          background: agreed && !loading ? '#1E3A8A' : '#ccc',
          color: 'white', border: 'none', borderRadius: '10px',
          cursor: agreed && !loading ? 'pointer' : 'not-allowed'
        }}>
          {loading ? 'Posting...' : 'Post Product 🚀'}
        </button>
      </form>
    </div>
  );
};

export default Sell;