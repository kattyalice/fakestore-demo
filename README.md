🛒 FakeStore Demo — Full-Stack E-Commerce Application

A full-stack e-commerce demo application built with React, TypeScript, Firebase, Redux Toolkit, and React Query.
This project demonstrates real-world patterns such as authentication, role-based access control, state management, admin dashboards, and automated testing.

⚠️ This project is intended as a portfolio and resume demo, not a production deployment.

🚀 Features
🧑‍💻 User Features

User authentication with Firebase Auth

View products with:

Category filtering

Search (Fuse.js)

Sorting (price & title)

Shopping cart with Redux Toolkit

Persistent cart state

Order history and order detail pages

Profile management (view/edit profile)

Responsive design with Tailwind CSS

🔐 Admin Features

Role-based access control using Firestore (isAdmin)

Protected admin routes

Admin dashboard

Add new products

Edit existing products

Delete products

Admin-only navigation links

Admin access is enforced using:

Firestore user roles

Protected routes (AdminRoute)

Conditional UI rendering

🧠 Architecture & Tech Stack
Frontend

React + TypeScript

Vite

Tailwind CSS

React Router

Redux Toolkit

React Query

Fuse.js (search)

Backend / Services

Firebase Authentication

Firestore Database

Role-based authorization (isAdmin flag)

Testing

Jest

React Testing Library

🧪 Automated Tests

This project includes unit and integration tests to demonstrate testing fundamentals.

✅ CartIntegration.test.tsx

Integration test covering:

ProductCard

Redux cart slice

Cart page

Verifies:

Adding a product updates cart state

Cart UI reflects correct totals

✅ ProductCard.test.tsx

Unit test for ProductCard component

Verifies:

Product details render correctly

Redux addToCart action dispatches on button click

✅ Logout.test.tsx

Unit test for Logout page

Verifies:

Firebase signOut is called on mount

Logout UI renders as expected

Mocks are used for:

Firebase

Auth context

Redux hooks

React Router

Third-party UI components

🔑 Admin Access (Demo)

Admin access is controlled via a Firestore field (isAdmin).

For security reasons, admin credentials are not included in this repository.

To grant admin access:

Create a user account through the application

Open Firebase Console → Firestore Database

Navigate to the users collection

Set isAdmin: true on the desired user document

Refresh the session

{
  "name": "Admin User",
  "email": "admin@example.com",
  "address": "",
  "isAdmin": true
}

🔒 Production Note

In a real production environment, admin roles would be managed via:

Firebase Admin SDK

Secure backend APIs

Server-side tooling

This demo simulates that workflow appropriately for a frontend-focused portfolio project.

🖥️ Running Locally
# Install dependencies
npm install

# Start development server
npm run dev

📦 Environment Variables

Create a .env file with your Firebase configuration:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

🌐 Deployment

This project is designed to be deployed with:

Vercel (recommended)

Firebase hosting

Netlify

🎯 Why This Project Matters

This application demonstrates:

Real authentication flows

Role-based authorization

Scalable state management

Admin-only workflows

Clean component architecture

Automated testing practices

It reflects how modern frontend applications are structured in real-world teams.

👩‍💻 Author

Katie Baldridge
Aspiring Software Engineer | Full-Stack & Frontend Focus
Built as part of a professional portfolio to demonstrate production-style React applications.