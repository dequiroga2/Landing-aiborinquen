# Overview

AI Borinquen is a Spanish-language landing page and lead generation platform for an AI assistant business. The site showcases AI-powered virtual assistant solutions for various industries (clinics, restaurants, hotels, and general use). Visitors fill out a lead form with their contact info and business details, which gets stored in a PostgreSQL database and optionally forwarded to an N8N webhook for automated follow-up (e.g., triggering an AI phone call).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router)
- **Styling:** Tailwind CSS with CSS variables for theming (dark theme with neon green accent)
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives
- **Fonts:** Inter (body) and Outfit (display/headings), loaded via Google Fonts
- **Animations:** Framer Motion for scroll reveals and transitions
- **Forms:** react-hook-form with Zod validation via @hookform/resolvers
- **Data Fetching:** TanStack React Query with a custom `apiRequest` helper
- **Path aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Runtime:** Node.js with Express 5
- **Language:** TypeScript, executed via `tsx`
- **Dev Server:** Vite dev server is integrated as middleware in development; in production, static files are served from `dist/public`
- **Build:** Custom build script at `script/build.ts` that outputs to `dist/`

### Data Layer
- **Database:** PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM:** Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema location:** `shared/schema.ts` — shared between client and server
- **Migrations:** Managed via `drizzle-kit push` (schema push, no migration files needed)
- **Storage pattern:** `server/storage.ts` defines an `IStorage` interface with a `DatabaseStorage` implementation, making it easy to swap storage backends

### Database Schema
Single table:
- **leads** — `id` (serial PK), `name` (text), `email` (text), `phone` (text), `businessDescription` (text), `assistantType` (text)

### API Structure
One endpoint:
- `POST /api/leads` — Validates request body against `insertLeadSchema` (Zod), stores the lead in the database, and optionally sends the data to an N8N webhook

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` — Drizzle table definitions, Zod validation schemas, TypeScript types, and assistant option constants
- `routes.ts` — API route contract definitions (path, method, input/output schemas) and a URL builder utility

### Project Structure
```
client/          → React frontend
  src/
    components/  → App components (Header, Hero, UnifiedForm, Footer)
    components/ui/ → shadcn/ui component library
    hooks/       → Custom React hooks
    lib/         → Utilities (queryClient, cn helper)
    pages/       → Page components (Home, not-found)
server/          → Express backend
  index.ts       → App entry point, middleware setup
  routes.ts      → API route handlers
  storage.ts     → Database access layer
  db.ts          → Database connection pool
  vite.ts        → Vite dev server integration
  static.ts      → Production static file serving
shared/          → Shared types, schemas, and route contracts
migrations/      → Drizzle migration output directory
```

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable using `pg` (node-postgres) pool
- **N8N Webhook** — Optional integration via `N8N_WEBHOOK_URL` environment variable. When set, lead submissions are forwarded to this webhook URL for workflow automation (e.g., triggering automated calls)
- **Google Fonts** — Inter and Outfit font families loaded from fonts.googleapis.com
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` are used in development when running on Replit