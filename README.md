# FX Trader Website (MERN Stack)

A forex trader landing page with an admin panel to manage:
- Social media links (Instagram, YouTube, TikTok, Telegram, Facebook, WhatsApp)
- Services (Basic / Pro / VIP packages)
- Trading videos

## Folder Structure

```
fx-trader-website/
├── backend/                 # Express + MongoDB API
│   ├── config/db.js          # MongoDB connection
│   ├── models/                # Mongoose schemas: Admin, Social, Service, Video
│   ├── controllers/           # CRUD logic per resource
│   ├── routes/                 # API routes (public GET, protected POST/PUT/DELETE)
│   ├── middleware/             # JWT auth + error handling
│   ├── seedAdmin.js            # Creates the first admin login
│   ├── server.js               # App entry point
│   └── .env.example
│
└── frontend/                 # React (Vite) + Tailwind
    └── src/
        ├── api/axios.js         # Pre-configured axios instance (auto-attaches admin token)
        ├── components/          # Public homepage sections (Navbar, Hero, Services, Videos, SocialLinks, Footer)
        ├── pages/Home.jsx        # Assembles the public homepage
        ├── context/AuthContext.jsx
        └── admin/                # Admin panel (login, layout, dashboard, manage pages)
```

## How it works
- The public homepage fetches Socials/Services/Videos from the API (GET routes — no login needed).
- The Admin Panel (`/admin`) lets you log in and Add/Edit/Delete each of those three sections.
- Changes made in the Admin Panel appear immediately on the homepage (no code changes needed).

## Setup — Backend
```
cd backend
npm install
cp .env.example .env      # fill in your MongoDB URI and JWT secret
node seedAdmin.js         # creates your admin login using ADMIN_EMAIL/ADMIN_PASSWORD in .env
npm run dev               # starts on http://localhost:5000
```

## Setup — Frontend
```
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

Visit:
- `http://localhost:5173` — public site
- `http://localhost:5173/admin/login` — admin login

## Deployment (later)
- Backend → Railway or Render
- Frontend → Vercel or Netlify
- Database → MongoDB Atlas (free tier)
