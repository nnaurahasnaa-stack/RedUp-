# RedUp - Health Education Platform

## Overview

RedUp is a health education platform for Indonesian teenagers, focusing on reproductive health and anemia awareness. The application provides interactive learning through video materials, health articles, and quizzes with certificate generation. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom medical red theme
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and UI animations
- **Forms**: React Hook Form with Zod validation
- **PDF Generation**: jsPDF for certificate generation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Authentication**: Passport.js with local strategy, session-based auth
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **Password Hashing**: Node.js crypto (scrypt)

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Tables**: users, questions, articles

### API Structure
- RESTful API endpoints under `/api/`
- Route definitions in `shared/routes.ts` with Zod schemas
- Authentication endpoints: `/api/register`, `/api/login`, `/api/logout`, `/api/user`
- Content endpoints: `/api/questions`, `/api/articles`

### Build System
- **Development**: Vite dev server with HMR
- **Production Build**: Custom build script using esbuild for server, Vite for client
- **Output**: Bundled to `dist/` directory

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Route pages
│   │   └── lib/          # Utilities
├── server/           # Express backend
│   ├── auth.ts       # Authentication setup
│   ├── db.ts         # Database connection
│   ├── routes.ts     # API routes
│   └── storage.ts    # Data access layer
├── shared/           # Shared code
│   ├── schema.ts     # Drizzle schema
│   └── routes.ts     # API route definitions
└── migrations/       # Database migrations
```

## External Dependencies

### Database
- PostgreSQL (required, connection via DATABASE_URL environment variable)
- Drizzle Kit for schema migrations (`npm run db:push`)

### Key npm Packages
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `express` / `express-session`: Web server and session management
- `passport` / `passport-local`: Authentication
- `@tanstack/react-query`: Data fetching and caching
- `framer-motion`: Animations
- `jspdf`: PDF certificate generation
- `zod`: Schema validation

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: Session encryption key (optional, defaults to "redup_secret")

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner