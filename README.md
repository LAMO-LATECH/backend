# LAMO Backend

REST API for the LAMO city navigation app — handles authentication, user management, and (soon) ad services.

---

## Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Runtime   | Node.js                       |
| Framework | Express v5                    |
| Database  | MongoDB + Mongoose v9         |
| Auth      | JWT (access + refresh tokens) |
| Passwords | bcrypt                        |

---

## Prerequisites

- Node.js (LTS recommended)
- MongoDB running locally **or** a MongoDB Atlas connection string

---

## Getting Started

```bash
git clone https://github.com/LAMO-LATECH/lamo-app.git
cd lamo-app/backend
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

The server starts at `http://localhost:4000`.

---

## Environment Variables

| Variable             | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `MONGODB_URI`        | MongoDB connection string (e.g. `mongodb://localhost:27017/lamo`)      |
| `PORT`               | Port the server listens on (default: `4000`)                           |
| `JWT_ACCESS_SECRET`  | Secret for signing access tokens — use a long random string            |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens — use a different long random string |

Generate strong secrets:

```bash
openssl rand -hex 64
```

---

## API Reference

### Auth — `/api/v1/auth`

| Method | Path        | Auth required | Description                                 |
| ------ | ----------- | ------------- | ------------------------------------------- |
| POST   | `/register` | No            | Create a new user account                   |
| POST   | `/login`    | No            | Login and receive tokens                    |
| POST   | `/refresh`  | No            | Exchange refresh token for new access token |
| POST   | `/logout`   | Yes           | Invalidate the refresh token                |

### Users — `/api/v1/users` (all routes require Bearer token)

| Method | Path              | Auth required | Description                       |
| ------ | ----------------- | ------------- | --------------------------------- |
| GET    | `/me`             | Yes           | Get current user's profile        |
| PATCH  | `/me`             | Yes           | Update current user's profile     |
| GET    | `/me/preferences` | Yes           | Get current user's preferences    |
| PATCH  | `/me/preferences` | Yes           | Update current user's preferences |

---

## Project Structure

```
src/
├── index.js              # Entry point — starts the HTTP server
├── app.js                # Express app setup, middleware, route mounting
├── config/
│   ├── database.js       # MongoDB connection logic
│   └── constants.js      # Shared constants (token expiry, etc.)
├── routes/
│   ├── auth.route.js     # Auth route definitions
│   └── user.route.js     # User route definitions
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   └── token.service.js
├── models/
│   ├── user.model.js
│   └── userPreferences.model.js
└── middleware/
    └── auth.middleware.js  # JWT protect + admin guard (maybe admin wants to update businesses)
```

---

## Scripts

| Command       | Description                       |
| ------------- | --------------------------------- |
| `npm run dev` | Start dev server with nodemon     |
| `npm start`   | Start production server with node |

---
