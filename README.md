🛍️ FakeStore – Full-Stack E-Commerce Demo

A modern full-stack e-commerce application built with React, TypeScript, Redux Toolkit, Firebase, and Tailwind CSS.
This project demonstrates real-world frontend architecture, authentication, state management, admin authorization, and testing practices.

🚀 Live Demo

(Optional – add your deployed link here)
https://your-live-site-url.com

🧠 Project Overview

FakeStore is a fully functional e-commerce demo that allows users to browse products, manage a cart, authenticate with Firebase, and place orders.
An admin-only dashboard provides secure access to product management features such as adding, editing, and deleting products.

The project was designed to be scalable, testable, and resume-ready, following best practices for modern frontend development.

✨ Features
👤 User Features

Browse products with search, category filtering, and sorting

Add/remove items from cart using Redux Toolkit

View cart totals and item counts in real time

Firebase authentication (register, login, logout)

User profile with editable personal information

Order history view

🛡️ Admin Features

Admin-only dashboard protected by route guards

Add new products

Edit existing products

Delete products

Admin navigation only visible to authorized users

Admin permissions stored and validated via Firestore

## 🔐 Demo Admin Access

This application includes an admin dashboard to demonstrate role-based authorization.

You may use the following **demo-only admin credentials** to access admin features:

**Email:** katty@example.com  
**Password:** password1

⚠️ These credentials are for demonstration purposes only.  
This is a fake account tied to a non-production Firebase project and does not grant access to any real or sensitive data.

Admin access is enforced via a Firestore `isAdmin` flag and protected using route-based guards.


🧱 Tech Stack
Frontend

React + TypeScript

Redux Toolkit (cart state management)

React Router v6

Tailwind CSS

TanStack React Query

Backend / Services

Firebase Authentication

Firebase Firestore

Testing

Jest

React Testing Library

🧪 Testing

This project includes unit and integration tests to validate core functionality.

Included Tests

ProductCard Component Test

Verifies product details render correctly

Ensures clicking “Add to cart” dispatches the correct Redux action

Mocks Redux hooks, Firebase, routing, and UI dependencies

Cart Integration Test

Confirms cart state updates when a product is added

Validates Redux store integration across components

Asserts correct item count and pricing totals

Logout Component Test

Ensures Logout page renders successfully

Confirms Firebase signOut is called on mount

Isolates authentication side effects using Jest mocks

Run tests locally with:

npm test

🔐 Authentication & Authorization

Firebase Authentication manages user sessions

User profiles are stored in Firestore

Admin access is determined by an isAdmin boolean field on the user document

Admin routes are protected using a custom <AdminRoute /> component

Admin UI elements only render when authorized

🗂️ Project Structure (Simplified)
src/
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── AdminRoute.tsx
├── pages/
│   ├── Home.tsx
│   ├── Cart.tsx
│   ├── Profile.tsx
│   ├── AdminDashboard.tsx
│   ├── ManageProducts.tsx
│   ├── AddProduct.tsx
│   └── EditProduct.tsx
├── context/
│   ├── AuthContext.tsx
│   └── ProductContext.tsx
├── redux/
│   ├── cartSlice.ts
│   └── store.ts
├── tests/
│   ├── ProductCard.test.tsx
│   ├── CartIntegration.test.tsx
│   └── Logout.test.tsx

📌 What This Project Demonstrates

Real-world React + TypeScript architecture

Redux Toolkit usage for global state

Secure authentication and role-based authorization

Admin route protection and conditional UI rendering

Clean separation of concerns

Component, integration, and side-effect testing

Scalable structure suitable for production growth

📈 Future Improvements

Pagination for large product lists

Image upload support

Order management for admins

Role management UI

Enhanced accessibility testing

CI/CD pipeline integration

👋 Author

Katie Baldridge
Full-Stack Software Engineer (Frontend-Focused)

GitHub: https://github.com/kattyalice

LinkedIn: (add your LinkedIn here)