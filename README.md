
---

# MERN Stack User Management System

A full-stack **MERN application** for managing users with authentication, profile management, pagination, search, CSV export, and profile image support.

This project was built as part of a **MERN stack practical task**.

---

## 🚀 Features

### 🔐 Authentication

* User registration & login (JWT based)
* Protected routes
* Persistent login using token storage

### 👤 User Management

* Add, edit, view, delete user profiles
* Upload and display profile images
* Update user status (Active / Inactive)
* View profile details in a clean, styled layout

### 📋 Listing & Utilities

* Paginated user listing
* Continuous serial numbers across pages
* Search users by name/email
* Export all users to CSV
* Three-dot action menu (View / Edit / Delete)

### 📦 Bulk Operations

* Bulk user creation via API
* CSV export for all users

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router DOM
* Context API
* Tailwind CSS
* Axios
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer (file uploads)
* CSV export (json2csv)

---

## 📁 Project Structure

### Backend

```
backend/
├── configs/
├── controllers/
├── middleware/
├── models/
├── routes/
├── schema/
├── uploads/
├── .env
├── server.js
├── package.json
└── vercel.json
```

### Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── profile/
│   │   └── table/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
└── package.json
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
PORT=3080
MONGODB_URI=mongodb+srv://<username>@cluster0.p9l5aix.mongodb.net/user-mgmt
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3080/api/v1
```

---

## ▶️ Running the Project Locally

### Backend

```bash
cd backend
npm install
npm run start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints (Key)

### Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `GET /api/v1/auth/me`

### Profiles

* `GET /api/v1/profiles` (pagination)
* `GET /api/v1/profiles/:id`
* `POST /api/v1/profiles`
* `PUT /api/v1/profiles/:id`
* `DELETE /api/v1/profiles/:id`
* `POST /api/v1/profiles/bulk`
* `GET /api/v1/profiles/export`

---

## 📤 CSV Export

* Exports **all user profiles**
* Columns:

  ```
  firstName, lastName, email, mobile, gender, status, location, createdAt
  ```
* Download handled on frontend using Blob API

---


---

## 🧠 Implementation Highlights

* Backend-driven pagination
* Auth-safe data fetching with `authReady`
* Clean Context API architecture
* Proper separation of concerns
* Production-style error handling

---

## 🔮 Future Improvements

* Role-based access (Admin/User)
* Advanced filtering
* CSV export for filtered results
* Skeleton loaders & animations

---

## 👨‍💻 Author

**Aryan Tyagi**

---

If you want, I can now:

* remove sensitive keys safely
* prepare **submission checklist**
* write **interview explanation**
* optimize for **deployment (Vercel + MongoDB)**

Just tell me 👍
