# Mini Social Media App

A full-stack MERN social media application where users can:

- Register & Login
- Create Posts
- Upload Images
- Like & Unlike Posts
- Comment on Posts
- Edit & Delete Their Posts

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- ImageKit

## Frontend
- React
- Vite

---

# Project Structure

```bash
mini-social-media/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside backend:

```env
PORT=3000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Features Implemented

- User Authentication
- JWT Authorization
- Create Post API
- Get All Posts API
- Get Single Post API
- Edit Post API
- Delete Post API
- Like/Unlike System
- Comment System
- Image Upload

---

# Upcoming Features

- User Profiles
- Follow/Unfollow
- Notifications
- Real-time Chat
- Reels Upload
- Infinite Scroll Feed
- Deployment

---

# Author

Raj Tiwari