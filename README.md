🛒 FakeStore Demo – Full-Stack E-Commerce Application
A modern e-commerce web application built with React, TypeScript, Firebase, Redux Toolkit, and Tailwind CSS, featuring user authentication, cart functionality, admin-only product management, and automated testing.
🔗 Live Demo: https://fakestore-demo.vercel.app
📂 Repository: https://github.com/kattyalice/fakestore-demo



✨ Features
🧑‍💻 User Features
  •	User registration & login (Firebase Authentication)
  •	Persistent shopping cart with quantity controls
  •	Product search, filtering, and sorting
  •	Order history & profile management
  •	Responsive UI (mobile & desktop)
🛍️ Cart & State Management
  •	Global cart state using Redux Toolkit
  •	Add/remove items and adjust quantities
  •	Real-time cart count in navigation
🔐 Admin Features
  •	Admin-only dashboard protected by route guards
  •	Add, edit, and delete products (Firestore)
  •	Role-based access using isAdmin flag
  •	Admin navigation appears only for authorized users
🧪 Testing & CI
  •	Component & integration tests using Jest and React Testing Library
  •	GitHub Actions CI pipeline runs tests on every push to main



🖥️ Tech Stack
Frontend
  •	React + TypeScript
  •	Vite
  •	Tailwind CSS
  •	React Router
State Management
  •	Redux Toolkit
  •	React Context (Auth)
Backend / Services
  •	Firebase Authentication
  •	Firebase Firestore
Testing
  •	Jest
  •	React Testing Library
Deployment
  •	Vercel
  •	GitHub Actions (CI)



🧪 Tests Included
This project includes automated tests to validate core functionality:
✅ ProductCard Component Test
  •	Verifies product details render correctly
  •	Confirms addToCart action dispatches on button click
✅ Cart Integration Test
  •	Ensures products added from the product card appear in the cart
  •	Validates cart totals and item counts update correctly
✅ Logout Component Test
  •	Confirms Firebase signOut is called on mount
  •	Verifies logout confirmation UI renders as expected
All tests run automatically via GitHub Actions on every push.



🔐 Admin Access
⚠️ Security Note
Admin credentials are not included in this repository for security reasons.
Admin access is controlled via a Firestore user document:
{
  "isAdmin": true
}
This allows role-based access without exposing sensitive credentials in source control.



⚙️ Local Setup
git clone https://github.com/kattyalice/fakestore-demo.git
cd fakestore-demo
npm install
npm run dev

Environment Variables
Create a .env.local file with your Firebase configuration:
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id



📌 Why This Project?
This project demonstrates:
•	Real-world authentication and role-based access
•	Scalable state management patterns
•	Clean component architecture
•	Automated testing and CI pipelines
•	Production deployment with environment configuration
Built as part of my transition into software engineering, this app reflects both technical growth and practical problem-solving.



👋 About the Developer
Kathryn Baldridge
Full-Stack Software Engineer
•	Python | JavaScript | TypeScript
•	React | Flask | SQLAlchemy
•	Firebase | REST APIs | CI/CD
🔗 GitHub: https://github.com/kattyalice
🔗 LinkedIn: https://www.linkedin.com/in/kathryn-baldridge/