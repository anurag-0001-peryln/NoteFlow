# NoteFlow 📝

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

A modern, full-stack notes management application built on the MERN stack. Designed with responsive UI components, user-level data isolation, secure JWT-based authentication, and robust REST APIs supporting search, filtering, and server-side pagination.

---

## 🚀 Key Features

- **Authentication & Security:** 
  - User registration and login powered by JSON Web Tokens (JWT).
  - Password encryption using `bcryptjs` with salt rounds.
  - Client-side route protection via React context and server-side authorization middleware.
  - Strict user-level isolation ensuring users only access and modify their own notes.
- **Notes Management (CRUD):** 
  - Create, read, edit, delete, and pin important notes.
  - Category tagging (`Work`, `Personal`, `Study`, `Ideas`, `General`).
- **Query Optimization:**
  - Full-text search across titles and content via regex matching.
  - Dynamic category-based filtering.
  - Server-side pagination (`page` and `limit` queries) for low-latency data fetching.
- **Modern Responsive UI:**
  - Built with React.js (Vite) and styled with Tailwind CSS.
  - Automatic token attachment via Axios interceptors.
- **Centralized Error Handling:**
  - Structured API responses and error middleware across all Express routes.
- **API Validation:**
  - Endpoints thoroughly tested and verified with Postman collections.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router v6, Tailwind CSS, Axios, Lucide React
- **Backend:** Node.js, Express.js
- **Database & ODM:** MongoDB Atlas, Mongoose
- **Security:** JSON Web Tokens (JWT), bcryptjs, CORS
- **Tooling & Version Control:** Vite, Postman, Git, GitHub

---

## 📁 Project Architecture

```text
NoteFlow/
├── backend/
│   ├── config/
│   │   └── db.js             # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── authController.js # Register & login logic
│   │   └── noteController.js # CRUD, search, filter, pagination
│   ├── middleware/
│   │   ├── authMiddleware.js # Token verification & user isolation
│   │   └── errorMiddleware.js# Global error handling
│   ├── models/
│   │   ├── User.js           # User schema with bcrypt pre-save hook
│   │   └── Note.js           # Note schema with user reference
│   ├── routes/
│   │   ├── authRoutes.js     # Auth API routes
│   │   └── noteRoutes.js     # Notes API routes
│   ├── .env                  # Environment variables (excluded from git)
│   └── server.js             # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js      # Axios instance with auth interceptor
    │   ├── context/
    │   │   └── AuthContext.jsx # Auth provider & ProtectedRoute component
    │   ├── pages/
    │   │   ├── Login.jsx     # User login page
    │   │   ├── Register.jsx  # User registration page
    │   │   └── Dashboard.jsx # Main notes dashboard
    │   ├── App.jsx           # Client-side router configuration
    │   └── main.jsx
    └── vite.config.js
