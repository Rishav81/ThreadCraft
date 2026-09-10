# ThreadCraft 🧵

### Full-Stack MERN Fashion E-Commerce Platform

ThreadCraft is a full-stack fashion e-commerce application built with the
**MERN stack**. It provides a complete shopping experience with
authentication, product discovery, cart, wishlist, checkout, payments,
orders, and user profiles.

The project focuses on practical full-stack development including REST APIs,
database design, authentication, third-party integrations, SEO, and
production deployment.

---

## 🌐 Live Demo

**Frontend:**  
https://thread-craft-mu.vercel.app/

**Backend API:**  
https://threadcraft-lq51.onrender.com/

**Repository:**  
https://github.com/Rishav81/ThreadCraft

---

## ✨ Features

### 👤 Authentication
- User registration and login
- JWT-based authentication
- HTTP-only cookies
- Protected routes
- User profile management
- Profile image upload with Cloudinary

### 🛍️ Products
- Product listing and details
- Category-based browsing
- Brand, color and size filters
- Product sorting
- Add, edit and delete listed products
- Seller/product ownership

### 🛒 Shopping
- Add to cart
- Update quantity
- Select cart items
- Wishlist management
- Checkout workflow
- Order history

### 💳 Payments
- Razorpay integration
- Server-side payment verification
- Secure order creation after successful payment

### 🎨 UI/UX
- Responsive design
- Tailwind CSS
- Framer Motion animations
- GSAP interactions
- Mobile, tablet and desktop support

### 🔎 SEO
- Dynamic metadata
- Canonical URLs
- XML sitemap
- robots.txt
- Breadcrumb JSON-LD
- Product JSON-LD structured data

### ☁️ Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas
- Images stored using Cloudinary
- Environment-based configuration
- Git-based deployment

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, React Router, Tailwind CSS |
| Backend | Node.js, Express.js, REST APIs |
| Database | MongoDB, Mongoose, MongoDB Atlas |
| Authentication | JWT, HTTP-only Cookies |
| Payments | Razorpay |
| Image Storage | Cloudinary, Multer |
| UI & Animation | Framer Motion, GSAP |
| Tools | Git, GitHub, Postman, VS Code |
| Deployment | Vercel, Render |

---

## 🏗️ Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Node.js + Express
     │
     ├── Authentication
     ├── Products
     ├── Cart
     ├── Wishlist
     ├── Orders
     └── Payments
     │
     ▼
MongoDB Atlas

External Services:
├── Razorpay → Payments
└── Cloudinary → Image Storage
