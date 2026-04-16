import React from 'react';
import ProductCard from './ProductCard';

const Marketplace = () => {
  const products = [
  { 
    id: 1, 
    name: "Engineering Mathematics Textbook", 
    price: 299, 
    save: 50, 
    offer: "Used", 
    image: "https://m.media-amazon.com/images/I/51Sc9pD9HhL._AC_UY327_FMwebp_QL65_.jpg" 
  },
  { 
    id: 2, 
    name: "Scientific Calculator Casio", 
    price: 850, 
    save: 150, 
    offer: "New", 
    image: "https://media.istockphoto.com/id/1072180382/photo/a-hand-calculator-on-black-background.jpg?s=612x612&w=0&k=20&c=vrNTkuGKCwXo9jJBC3FUwvr8ObM0vCzwqFSZdHN8H3Q="
  },
  { 
    id: 3, 
    name: "Hostel Study Lamp", 
    price: 399, 
    save: 100, 
    offer: "Like New", 
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Maths Turtoring", 
    price: 800, 
    save: 400, 
    offer: "Sale", 
    image: "https://media.istockphoto.com/id/1012230604/photo/teacher-helps-high-school-student-with-a-math-problem-on-the-whiteboard.jpg?s=612x612&w=0&k=20&c=4Chi6LmmtOuQ8Wmf5QaRlstcRo6k6BciI4iQifQJHiQ=" 
  },
  { 
    id: 5, 
    name: "Wireless Mouse", 
    price: 350, 
    save: 50, 
    offer: "Used", 
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=500&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    name: "Electric Kettle", 
    price: 550, 
    save: 120, 
    offer: "Used", 
    image: "https://media.istockphoto.com/id/1366759576/photo/tea-bag-mug-and-kettle-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fh6sZbm_LYEvzAIDqeH_eAwaTFRS1NdGluq620W2ufE=" 
  },
  { 
    id: 7, 
    name: "Laptop", 
    price: 3800, 
    save: 200, 
    offer: "Used", 
    image: "https://tse4.mm.bing.net/th/id/OIP.okPHK-lOk_E5nzOZsGx2dwHaFI?pid=Api&P=0&h=180"
  },
  { 
    id: 8, 
    name: "Lab Coat White", 
    price: 199, 
    save: 40, 
    offer: "Used", 
    image: "https://media.istockphoto.com/id/1125415605/photo/female-scientist-in-laboratory-looking-at-camera-with-white-lab-coat.jpg?s=612x612&w=0&k=20&c=mu5iPWgXG05AzF18_IDLHD3h6EavY6d2oSZg3BBjxYk=" 
  }
];

  return (
    <section className="marketplace-section">
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Recent Campus Listings</h2>
      <div className="product-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
};

export default Marketplace;