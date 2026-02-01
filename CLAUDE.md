# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack React template with TypeScript, featuring a React 19 frontend with Vite and an Express backend. The project uses a monorepo structure with separate `frontend/` and `backend/` directories.

## Development Commands

### Frontend (React + Vite)
```bash
cd frontend
npm run dev        # Start dev server (default: http://localhost:5173)
npm run build      # TypeScript check + production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend (Express + TypeScript)
```bash
cd backend
npm run dev        # Start dev server with nodemon + ts-node (default: port 4000)
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled JavaScript from dist/
```

### Full Stack Development
Run both servers concurrently in separate terminals:
1. Terminal 1: `cd frontend && npm run dev`
2. Terminal 2: `cd backend && npm run dev`

## Architecture

### Frontend Architecture

**Entry Point Flow:**
`main.tsx` → `App.tsx` → `AppThemeProvider` → `AppRouter` → `MainLayout` + Pages

**Key Architectural Patterns:**

1. **Provider Pattern:** `App.tsx` wraps the entire app with `AppThemeProvider` for MUI theming
2. **Layout Pattern:** `MainLayout` provides consistent Header/Footer across all pages via React Router
3. **Module-based Organization:** Features are organized in `modules/` (e.g., `modules/auth/`)
   - Each module exports types, API functions, and hooks
   - Example: `modules/auth/index.ts` contains `LoginPayload`, `RegisterPayload`, `authApi.login()`, `authApi.register()`

**Directory Structure:**
- `app/` - App-level configuration (providers, routing)
- `components/` - Shared components organized by category (e.g., `navigation/`)
- `layouts/` - Layout components (e.g., `MainLayout`)
- `pages/` - Page components organized by feature (e.g., `auth/`, `user/`)
- `modules/` - Feature modules with business logic, types, and API calls
- `utils/` - Utilities (e.g., `api/apiClient.ts` for axios configuration)
- `styles/` - Global styles and theme configuration

**State Management:**
- Currently uses localStorage for auth state (see login/register pages)
- No global state management library (Redux, Zustand, etc.) is configured

**Routing:**
All routes are centralized in `app/routes/AppRouter.tsx`:
- `/` - HomePage
- `/login` - LoginPage
- `/register` - RegisterPage
- `/find-password` - FindPasswordPage
- `/mypage` - MyPage

### Backend Architecture

**Entry Point Flow:**
`server.ts` (loads dotenv) → `app.ts` (Express config) → routes

**Modular Routing:**
- `app.ts` mounts all routes under `/api` prefix
- `routes/index.ts` aggregates feature routes (e.g., `/auth` → `auth.routes.ts`)
- Final endpoint structure: `/api/auth/login`, `/api/auth/register`

**Current Implementation:**
- In-memory user storage (array-based, no database)
- No password hashing (plaintext storage - marked for future improvement)
- No JWT implementation (returns dummy token)
- CORS configured to accept frontend origin via environment variable

**Available Endpoints:**
- `POST /api/auth/register` - User registration (email, password, name)
- `POST /api/auth/login` - User login (email, password)
- `GET /health` - Health check endpoint

## Environment Configuration

Both frontend and backend use environment variables:

**Frontend (.env):**
- `VITE_API_URL` - Backend API base URL (default: http://localhost:4000/api)
- `VITE_ENV` - Environment name

**Backend (.env):**
- `PORT` - Server port (default: 4000)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:5173)
- `NODE_ENV` - Node environment (development/production)

Copy `.env.example` to `.env` in each directory and adjust as needed.

## Important Technical Details

### MUI v7 (Breaking Changes)
This project uses MUI v7 (`@mui/material: ^7.x`). Key API changes from v5:

**Grid Component:**
```tsx
// OLD (MUI v5) - DO NOT USE
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>

// NEW (MUI v6+) - USE THIS
<Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
```

- `item` prop is removed
- `xs`, `sm`, `md`, `lg`, `xl` props are replaced with `size` prop
- Use `size={12}` for fixed size or `size={{ xs: 12, sm: 6 }}` for responsive

### React Compiler
This template has the experimental React Compiler enabled via `babel-plugin-react-compiler` in `vite.config.ts`. This may impact dev/build performance.

### TypeScript Configuration
- Frontend uses project references (`tsconfig.app.json` for app code, `tsconfig.node.json` for Vite config)
- Strict mode enabled with additional checks: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Backend uses `nodenext` module system with CommonJS (`type: "commonjs"` in package.json)

### Frontend-Backend Communication
- Frontend uses axios via `utils/api/apiClient.ts` singleton configured with baseURL from env
- API client instance is shared across all modules
- Backend uses `express.json()` middleware for JSON parsing
- CORS is configured with credentials support

### Authentication Flow
Current implementation (localStorage-based, no JWT verification):
1. User submits login/register form
2. Frontend calls `authApi.login()` or `authApi.register()` from `modules/auth/`
3. Backend validates credentials (in-memory array lookup)
4. On success, backend returns user data + dummy token
5. Frontend stores user data in localStorage
6. Header component (`MainHeader`) reads localStorage to show logged-in state

**Security Note:** Current auth implementation is a prototype. Production use requires:
- Password hashing (bcrypt)
- Real JWT token generation/validation
- Persistent database
- Token refresh mechanism
- HTTPS in production

## Adding New Features

### Adding a New Page
1. Create page component in `frontend/src/pages/{feature}/{PageName}/`
2. Add route in `frontend/src/app/routes/AppRouter.tsx`
3. Add navigation link in `MainHeader.tsx` if needed

### Adding a New API Endpoint
1. Create or update route file in `backend/src/routes/`
2. Register route in `backend/src/routes/index.ts`
3. Create corresponding API function in `frontend/src/modules/{feature}/`

### Adding a New Module
1. Create directory in `frontend/src/modules/{moduleName}/`
2. Create `index.ts` to export types, API functions, hooks
3. Import and use from pages/components
