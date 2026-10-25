# NoteFlow 📝

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

A modern, full-stack notes workspace application built on the MERN stack. Designed with responsive glassmorphism aesthetics, dynamic dark/light theme switching, user-level data isolation, secure JWT authentication, and high-performance REST APIs supporting full-text search, category filtering, and server-side pagination.

---

## 🚀 Key Features

- **Adaptive Theming Engine (Dark / Light Mode):**
  - Fully reactive theme toggling powered by custom `ThemeContext` and `ThemeToggle` component.
  - Automatically matches system OS preferences (`prefers-color-scheme`) and persists settings via `localStorage`.
  - Seamless color transitions across navigation headers, search inputs, modal sheets, and note cards.

- **Modern Glassmorphic UI/UX:**
  - Modern dashboard layout with frosted-glass containers, subtle borders, and smooth hover micro-animations.
  - Redesigned, clean **Login** and **Register** authentication portals.
  - Vector icon set powered by `lucide-react`.

- **Authentication & Security:**
  - User registration and login utilizing stateless JSON Web Tokens (JWT).
  - One-way salted password hashing powered by `bcryptjs`.
  - Secure React client route guards (`ProtectedRoute`) and Express server authorization middleware (`protect`).
  - Strict user-level isolation: queries and mutations are locked to the authenticated user ID.

- **Notes Management & Workflow (CRUD):**
  - Full lifecycle note creation, reading, inline updates, and deletion.
  - Pinning support to highlight high-priority notes at the top.
  - Categorization across standard buckets (`Work`, `Personal`, `Study`, `Ideas`, `General`).

- **Optimized Data Retrieval:**
  - Server-side regex search queries across note titles and content.
  - Dynamic category-based filtering.
  - Low-latency server-side pagination (`page` & `limit` query parameters).

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), React Router v6, Tailwind CSS, Lucide React, Axios
- **Backend:** Node.js, Express.js (Layered MVC architecture)
- **Database & ODM:** MongoDB Atlas, Mongoose
- **Security:** JSON Web Tokens (JWT), bcryptjs, CORS
- **Testing & Tooling:** Postman API Suite, Git, GitHub

---

## 📁 Project Architecture

```text
NoteFlow/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB Atlas cluster connection
│   ├── controllers/
│   │   ├── authController.js  # Registration & login controllers
│   │   └── noteController.js  # CRUD, search, filter, pagination
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT Bearer verification & user attachment
│   │   └── errorMiddleware.js # Global error handler
│   ├── models/
│   │   ├── User.js            # User schema with bcrypt pre-save hashing
│   │   └── Note.js            # Note schema with User ObjectId reference
│   ├── routes/
│   │   ├── authRoutes.js      # Auth API endpoints
│   │   └── noteRoutes.js      # Notes API endpoints
│   ├── .env                   # Environment variables (excluded from git)
│   └── server.js              # Express app entry & middleware mounting
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js       # Axios client with automated JWT interceptors
    │   ├── components/
    │   │   └── ThemeToggle.jsx# Animated dark/light mode toggle
    │   ├── context/
    │   │   ├── AuthContext.jsx # Global auth session & route guard
    │   │   └── ThemeContext.jsx# Theme state & localStorage persistence
    │   ├── pages/
    │   │   ├── Dashboard.jsx  # Main interactive notes workspace
    │   │   ├── Login.jsx      # Modernized login interface
    │   │   └── Register.jsx   # Modernized registration interface
    │   ├── App.jsx            # Multi-provider context wrapper & router
    │   └── main.jsx
    └── vite.config.js
