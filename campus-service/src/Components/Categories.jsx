import React from 'react';
import { FaBook, FaLaptop, FaHandHoldingUsd, FaHandHoldingHeart } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    icon: <FaBook size={40} />,
    name: "Books",
    description: "Academic textbooks, novels, and study materials."
  },
  {
    icon: <FaLaptop size={40} />,
    name: "Electronics",
    description: "Laptops, Second-hand electronics and gadgets."
  },
  {
    icon: <FaHandHoldingUsd size={40} />, 
    name: "Rentals",
    description: "Hostel essentials, appliances for rent."
  },
  {
    icon: <FaHandHoldingHeart size={40} />,
    name: "Free Items",
    description: "Items available for free from fellow students."
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <section id="categories-section" className="categories-section">
      <h2 className="categories-title">Browse Categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            onClick={() => handleCategoryClick(category.name)}
            className="category-card"
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-desc">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;