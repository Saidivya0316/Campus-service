# Campus Service – Student Marketplace

This repository contains a full-stack web application developed to simplify buying, selling, and sharing products within a college campus. The platform connects students in a single place where they can easily explore items, contact sellers, and manage transactions.

## Frontend

The frontend of this project is developed using **React.js**, providing a dynamic and interactive user interface.

The application includes multiple pages such as:

* Home Page
* Buy Page
* Wishlist Page
* Sell Page
* Cart Page

The UI is built using **HTML, CSS, and JavaScript**, ensuring a clean, responsive, and user-friendly design. Products are displayed using card-based layouts with images and action icons.

The frontend communicates with the backend using API calls and also handles local features like cart and wishlist storage.

## Backend

The backend is developed using **Node.js and Express.js**, acting as a bridge between frontend and database.

It handles:

* User authentication (Sign In)
* Product posting and retrieval
* Product deletion (seller only)
* Request item handling

The backend provides REST APIs for smooth communication.

##  Database

The project uses **MongoDB** for storing data.

### Collections:

* **Users** → Stores user details (Name, Roll Number)
* **Products** → Stores product details (Name, Price, Category, Condition, Image, Seller Info)
* **Requests** → Stores requested items

##  User Roles

### Student (User)

* Browse products
* Search and filter items
* Add to cart and wishlist
* Share products
* Chat with seller via WhatsApp
* Place orders

### Seller

* Sign in required
* Post products
* Delete own products

## Workflow

Home Page → Browse / Sell →
Browse Products → View Details → Add to Cart / Wishlist / Chat → Checkout → Invoice

OR

Sign In → Post Product → Product stored in database → Visible in Buy Page

## Features

* Navigation with multiple pages
* Category-based browsing
* Search and filter options
* Wishlist management
* Cart functionality with total amount
* Checkout with invoice generation
* Chat with seller (WhatsApp integration)
* Share products (social media & link)
* Seller product management
* Dark/Light theme toggle
* Request item feature

## Installation and Setup

### 1. Clone the Repository

git clone https://github.com/Saidivya0316/Campus-service.git
cd campus-service

### 2. Install Dependencies

#### Frontend

cd frontend
npm install

#### Backend

cd ../backend
npm install

### 3. Run the Project

#### Start Backend

cd backend
npm start

#### Start Frontend

cd frontend
npm start

### 4. Open in Browser

http://localhost:3000

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB

##  Challenges Faced

* Connecting frontend with backend
* Managing product state (cart & wishlist)
* Handling user-based actions (seller features)
* Designing responsive UI

## Future Scope

* Mobile application (Android/iOS)
* Online payment integration
* Rating and review system
* AI-based recommendations
* Secure authentication (OTP/email)
* Cloud deployment

## Advantages

* Easy to use
* Saves time
* Affordable for students
* Centralized platform
* Real-time product updates

## Limitations

* Requires internet connection
* Basic authentication system
* Limited payment features

## Conclusion

Campus Service is an efficient student marketplace that simplifies buying and selling within a campus. It reduces effort, saves money, and creates a connected student community.

## Author

Sai divya 
