# Ecommerce-fullS

[![CI](https://github.com/ahmadali3009/Ecommerce-fullS/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmadali3009/Ecommerce-fullS/actions/workflows/ci.yml)
[![Node 18+](https://img.shields.io/badge/node-18%2B-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Production-ready MERN e-commerce: REST API (Express + Mongoose), SPA frontend (React + Vite), JWT auth with cookie delivery, Stripe Payment Intents (AED), and an admin dashboard with analytics. Built for clarity and deployability—CI lint/build, CD to EC2 via Docker and GitHub Container Registry.

---

## Contents

- [Architecture](#architecture)
- [Stack & rationale](#stack--rationale)
- [Features](#features)
- [Project layout](#project-layout)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [API overview](#api-overview)
- [Security](#security)
- [Deployment](#deployment)
- [License & contact](#license--contact)

---

## Architecture

```
┌─────────────────┐     HTTPS      ┌─────────────────┐     ┌──────────────┐
│  React SPA       │ ◄───────────► │  Express API     │ ◄──►│  MongoDB     │
│  (Vite, :5173)   │   credentials │  (:8080)        │     │  (Atlas)     │
└────────┬────────┘   (JWT cookie) └────────┬────────┘     └──────────────┘
         │                                  │
         │  Stripe.js (client)              │  Stripe SDK (server)
         ▼                                  ▼
┌─────────────────┐                 ┌─────────────────┐
│  Stripe Elements │                 │  Payment Intents │
└─────────────────┘                 └─────────────────┘
```

- **Auth:** Passport Local (login) → JWT issued and sent via httpOnly cookie; protected routes use Passport JWT (cookie extractor). Session store used for optional server-side session.
- **Payments:** Client collects payment method; server creates Payment Intent and returns `client_secret`; no card data touches the app server.

---

## Stack & rationale

| Concern | Choice | Why |
|--------|--------|-----|
| Frontend | React 18, Vite | Fast HMR, small bundle, standard tooling. |
| State | Redux Toolkit | Predictable state, RTK Query–style patterns for API. |
| Backend | Express 5, Mongoose | Simple REST surface, schema validation and migrations via Mongoose. |
| Auth | Passport (local + JWT) | Pluggable strategies; JWT in cookie keeps XSS surface small while supporting cross-origin. |
| Payments | Stripe Payment Intents | PCI-friendly; no card handling on our side. |
| DB | MongoDB Atlas | Managed, scales with usage. |
| Delivery | Docker + Nginx (frontend), Node (backend) | Reproducible, CD pushes to GHCR and runs on EC2. |

---

## Features

- **Auth & users:** Email/password signup and login, JWT in httpOnly cookie, role-based access (user vs admin), profile and order history.
- **Catalog:** Products with categories and brands, listing and detail views.
- **Cart & checkout:** Persistent cart (per user), checkout flow, Stripe integration (AED).
- **Orders:** User order history; admin list and status updates.
- **Admin:** Dashboard with Recharts, product CRUD, order management, and aggregate metrics.

---

## Project layout

```
Ecommerce-fullS/
├── backend/                    # Express API
│   ├── controller/             # Route handlers
│   ├── model/                  # Mongoose schemas (user, product, order, cart, category, brand)
│   ├── routes/                 # Mounted routers (auth, users, products, cart, order, adminorder)
│   ├── services/               # common (sanitizeUser, isAuth, cookieExtractor)
│   ├── connection.js           # MongoDB connect
│   └── index.js                # App bootstrap, CORS, Passport, Stripe route
├── src/
│   ├── app/store.jsx           # Redux store
│   ├── features/               # auth, cart, products, admin, order, user, navbar
│   ├── pages/                  # Route-level components
│   └── config.js               # API base URL (VITE_API_URL)
├── Dockerfile                  # Frontend: Node build → Nginx
├── nginx.conf                  # SPA fallback
└── .github/workflows/          # ci.yml (lint + build), cd.yml (build + push + EC2 deploy)
```

---

## Quick start

**Requirements:** Node 18+, MongoDB (e.g. [Atlas](https://www.mongodb.com/atlas)), optional Stripe keys.

```bash
git clone https://github.com/ahmadali3009/Ecommerce-fullS.git
cd Ecommerce-fullS
npm install
cd backend && npm install && cd ..
cp backend/.env.example backend/.env   # then edit backend/.env
```

**Run (two processes):**

```bash
# Terminal 1 – API
cd backend && npm run dev

# Terminal 2 – Frontend
npm run dev
```

- App: [http://localhost:5173](http://localhost:5173)  
- API: [http://localhost:8080](http://localhost:8080)

Root `npm run dev` starts only the frontend; backend must be run from `backend/`.

---

## Configuration

| Location | Variable | Purpose |
|----------|----------|---------|
| `backend/.env` | `MONGODB_URI` | MongoDB connection string (required). |
| | `JWT_SECRET` or `SECRET_KEY` | JWT signing secret (required). |
| | `SESSION_SECRET` | Session encryption (optional; falls back to JWT secret). |
| | `CORS_ORIGIN` / `FRONTEND_URL` | Allowed origins, comma-separated (required in production). |
| | `PORT` | API port (default `8080`). |
| | `STRIPE_SECRET_KEY` | Stripe secret; omit to disable payments. |
| Root `.env` | `VITE_API_URL` | Backend URL for the SPA (default `http://localhost:8080`). |

---

## API overview

| Base | Purpose |
|------|---------|
| `POST /auth/*` | Signup, login, logout, session. |
| `GET/POST /users/*` | Profile, orders (authenticated). |
| `GET/POST /cart/*` | Cart CRUD (authenticated). |
| `GET/POST /` (products) | Product list, filters, single product. |
| `GET/` (categories, brands) | Catalog metadata. |
| `POST /create-payment-intent` | Stripe Payment Intent (body: `totalAmount`, `orderId`). |
| `GET/POST /orders/*` | Create order, list user orders. |
| `GET/PATCH /admin/orders/*` | Admin order list and status. |

All authenticated routes expect JWT via cookie (set by login).

---

## Security

- **Secrets:** JWT and session secrets live in env only; `.env` is gitignored.
- **Passwords:** Salted and hashed with PBKDF2 (310k iterations, SHA-256).
- **Auth:** JWT in httpOnly cookie (no `localStorage`) to reduce XSS impact; CORS allowlist (no `*` with credentials).
- **Stripe:** Secret key used only on the server; client uses publishable key and Stripe.js.
- **Production:** Use HTTPS, restrict `CORS_ORIGIN` to your frontend origin(s), and rotate secrets periodically.

---

## Deployment

- **CI** (`.github/workflows/ci.yml`): On push/PR to `main`/`master` — frontend lint + build, backend install.
- **CD** (`.github/workflows/cd.yml`): On push to `main`/`master` — build frontend and backend Docker images, push to GHCR, SSH to EC2 and run containers with env from GitHub Secrets.

**Secrets used by CD:** `EC2_HOST`, `EC2_SSH_KEY`, `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, `STRIPE_SECRET_KEY`; optional: `EC2_USER`, `GHCR_TOKEN`.

Frontend image is built with `VITE_API_URL` set to `http://<EC2_HOST>:8080` so the SPA talks to the API on the same host. Backend listens on 8080; frontend container serves on 80.

---

## License & contact

MIT.  
**Ahmed Ali Butt** — [abutt3009@gmail.com](mailto:abutt3009@gmail.com) · [LinkedIn](https://www.linkedin.com/in/ahmedali3009/) · [Portfolio](https://ahmedaliporfolio3009.netlify.app)

Contributions: open an issue or PR.
