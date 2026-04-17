import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import API from "../api";

const Buy = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [condition, setCondition] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(10000);
  
  const [showSort, setShowSort] = useState(false);
  const [showCond, setShowCond] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const [displayProducts, setDisplayProducts] = useState([]);

  const staticProductsList = [
    { id: 1, name: "Engineering Mathematics M1", price: 299, save: 50, offer: "Used", condition: "used", category: "Books", image: "https://m.media-amazon.com/images/I/611Mu7QvyCL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 2, name: "Python Programming Book", price: 550, save: 120, offer: "Used", condition: "used", category: "Books", image: "https://m.media-amazon.com/images/I/61ViPUXS8ZL._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 4, name: "Casio Calculator FX-991ES", price: 850, save: 150, offer: "New", condition: "new", category: "Electronics", image: "https://images.unsplash.com/photo-1653617748424-3f30c41de246?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, name: "Real hand written notes(java)", price:0, save:100, offer: "Sale", condition: "used", category: "Free Items", image: "https://tse1.mm.bing.net/th/id/OIP.CgTpMCh_G8osEBacgsToBQHaFj?pid=Api&P=0&h=180" },
    { id: 10, name: "LED Study Lamp", price: 399, save: 100, offer: "Used", condition: "used", category: "Hostel Essentials", image: "https://images.unsplash.com/photo-1605194004886-56d82f482d53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1MHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 13, name: "Turtoring about Computer", price:0, save: 2000,  category: "Free Items", image: "https://tse4.mm.bing.net/th/id/OIP.dPLn3T2e89Mpp6sJ3z-mPAHaFm?pid=Api&P=0&h=180" },
    { id: 14, name: "Lab Coat White (L)", price: 200, save: 100, offer: "Used", condition: "used", category: "Stationery", image: "https://plus.unsplash.com/premium_photo-1661393176161-fbd3c5696afa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8" },
    { id: 15, name: "Laptop Service", price: 1000, save: 500, offer: "New", condition: "new", category: "Electronics", image: "https://plus.unsplash.com/premium_photo-1663013244412-1153aabaa1bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D" },
    { id: 11, name: "Electric Kettle 1.5L", price: 400, save: 100, offer: "Used", condition: "used", category: "Hostel Essentials", image: "https://media.istockphoto.com/id/1489110369/photo/modern-black-electric-teapot-against-blurred-kitchen-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=stBCn5LAkPS--p3vYelEhpcdsREMM8ZRJuM2yPOxdHE=" },
    { id: 12, name: "Backpack Waterproof", price: 899, save: 200, offer: "New", condition: "new", category: "Hostel Essentials", image: "https://images.unsplash.com/photo-1622560482357-789dc8a50923?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQxfHx8ZW58MHx8fHx8" },
    { id: 9, name: "MTB Mountain Bike", price: 500, save: 1000, offer: "Used", condition: "used", category: "Rentals", image: "https://images.unsplash.com/photo-1706252381449-bd6830db2fa7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8" },
    { id: 5, name: "Wireless Mouse", price: 450, save: 50, offer: "New", condition: "new", category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=500" },
    { id: 21, name: "Mask and Hand Blouse", price:20, save: 50, offer: "New", condition: "new", category: "Stationery", image: "https://tse2.mm.bing.net/th/id/OIP.OhreddZquGdW_GoRyKx1HAHaHa?pid=Api&P=0&h=180" },
    { id: 22, name: " Code Helper", price:0, save: 500, offer: "Used", condition: "used", category: "Free Items", image: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZSUyMHNvbHZlcnxlbnwwfHwwfHx8MA%3D%3D" }, 
    { id: 3, name: "Data Structures & Algorithms", price: 450, save: 80, offer: "New", condition: "new", category: "Books", image: "https://m.media-amazon.com/images/I/714+tgyHDRL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 16, name: "English Text Book", price: 100, save: 500, offer: "Used", condition: "used", category: "Books", image: "https://m.media-amazon.com/images/I/91xDayO9wQL._SL1500_.jpg" },
    { id: 17, name: "Old Engineering Graphics Set", price: 0, save: 100, offer: "FREE", condition: "used", category: "Free Items", image: "https://m.media-amazon.com/images/I/61TRyhB7SAL._AC_UL480_FMwebp_QL65_.jpg" }
  ];

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      console.log("Fetched API Products:", res.data);
      // Validate that res.data is an array before spreading
      const apiProducts = Array.isArray(res.data) ? res.data : [];
      setDisplayProducts([...apiProducts, ...staticProductsList]);
    } catch (err) {
      console.error("Error fetching products:", err);
      // Fallback to static products if API fails
      setDisplayProducts(staticProductsList);
    }
  };

  fetchProducts();

  const params = new URLSearchParams(location.search);
  const catParam = params.get('category');
  if (catParam) setActiveCategory(catParam);

}, [location]);
const deleteProduct = async (id) => {
  await API.delete(`/products/${id}`);
  alert("Deleted");
  window.location.reload();
};
  const categoriesList = ["All", "Books", "Electronics", "Hostel Essentials", "Stationery", "Rentals", "Free Items"];

  const filteredProducts = displayProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
     const matchesCondition = condition === "All" || !product.condition || (product.condition && product.condition.toLowerCase() === condition.toLowerCase());
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return (a.price || 0) - (b.price || 0);
      if (sortBy === "Price: High to Low") return (b.price || 0) - (a.price || 0);
      if (sortBy === "Newest First") return (b.id || 9999) - (a.id || 9999);
      if (sortBy === "Oldest First") return (a.id || 0) - (b.id || 0);
      return 0;
    });

  return (
    <div className="buy-page">
      <div className="buy-header">
        <h1>Explore Services</h1>
        <p>Find the best deals on campus!</p>
      </div>

      <div className="category-tabs">
        {categoriesList.map(cat => (
          <button key={cat} className={`tab-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>

      <div className="search-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="filter-bar">
        <div className="dropdown-wrapper">
          <button className="filter-btn smooth-move" onClick={() => {setShowSort(!showSort); setShowCond(false); setShowPrice(false)}}>
            {sortBy} <FaChevronDown size={12} />
          </button>
          {showSort && (
            <div className="dropdown-menu">
              {["Newest First", "Oldest First", "Price: Low to High", "Price: High to Low"].map(opt => (
                <div key={opt} onClick={() => {setSortBy(opt); setShowSort(false)}}>{opt}</div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-wrapper">
          <button className="filter-btn smooth-move" onClick={() => {setShowCond(!showCond); setShowSort(false); setShowPrice(false)}}>
            Condition: {condition} <FaChevronDown size={12} />
          </button>
          {showCond && (
            <div className="dropdown-menu">
              {["All", "New", "Used"].map(opt => (
                <div key={opt} onClick={() => {setCondition(opt); setShowCond(false)}}>{opt}</div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown-wrapper">
          <button className="filter-btn smooth-move" onClick={() => {setShowPrice(!showPrice); setShowSort(false); setShowCond(false)}}>
            Max: ₹{priceRange} <FaChevronDown size={12} />
          </button>
          {showPrice && (
            <div className="dropdown-menu price-popup" style={{ padding: '15px', minWidth: '200px' }}>
              <input 
                type="range" min="0" max="10000" step="500" value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', marginTop: '5px' }}>₹{priceRange}</div>
            </div>
          )}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
  key={product.id || product._id} 
  product={product} 
  onDelete={deleteProduct}   
/>
          ))
        ) : (
          <p className="no-results-msg">No products found!</p>
        )}
      </div>
    </div>
  );
};

export default Buy;