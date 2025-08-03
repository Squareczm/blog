# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start dev server on port 3001 with Turbopack
- `npm run build` - Production build
- `npm run start` - Start production server on port 3000
- `npm run lint` - ESLint check

### Testing Commands
- `npm test` - Run Jest tests
- `npm run test:watch` - Watch mode testing
- `npm run test:security` - Security validation tests

### Single Test Execution
- `npm test -- --testNamePattern="auth"` - Run specific test
- `npm test -- --watch --testNamePattern="component"` - Watch specific tests

## Architecture Overview

### Core Data Flow
- **Storage Layer**: `src/lib/storage.ts` handles JSON file persistence
- **Data Layer**: Global state management via `src/lib/data.ts` (singleton pattern)
- **API Layer**: RESTful endpoints in `src/app/api/` routes
- **Presentation Layer**: Server components with client-side interactivity

### Security Architecture
- **JWT-based Auth**: 24h tokens via `jose` library
- **Middleware Protection**: `src/middleware.ts` guards `/admin/*` routes
- **Cookie Security**: HttpOnly, Secure (prod), SameSite=strict
- **Triple Validation**: Client → Middleware → API route

### Key Architectural Patterns

#### Data Persistence Pattern
```
File System (data/*.json) → storage.ts → data.ts → API Routes → Components
```

#### Authentication Flow
```
Login → JWT Token → HttpOnly Cookie → Middleware Validation → API Access
```

#### Route Organization
- **Public Routes**: `/`, `/posts/*`, `/about`, `/contact`, `/projects/*`
- **Protected Admin**: `/admin/*` (except `/admin/login`)
- **API Routes**: `/api/*` (admin routes require JWT)

### Critical Files to Understand

#### Storage System (`src/lib/storage.ts`)
- JSON file persistence with automatic directory creation
- Handles all data: posts, settings, messages, contacts
- Production-safe file operations

#### Auth System (`src/lib/auth.ts`)
- JWT token generation/validation
- Request authentication helpers
- Cookie management utilities

#### Data Management (`src/lib/data.ts`)
- Singleton pattern for in-memory caching
- Interface between storage and API routes
- Type-safe data access

#### Middleware (`src/middleware.ts`)
- Route protection logic
- Token validation strategy
- Redirect handling for unauthorized access

### Type System
- **Post**: Article content with AI/Nova/Life categories
- **Project**: Portfolio items with tech stacks
- **Message**: Contact form submissions
- **SiteSettings**: Global configuration
- **TimelineEvent**: Personal timeline data

### Development Patterns

#### Adding New Data Type
1. Define type in `src/types/index.ts`
2. Add data file constant in `src/lib/storage.ts`
3. Create API route in `src/app/api/[type]/route.ts`
4. Update admin UI in `src/app/admin/[type]/`

#### Image Upload Flow
1. Client uploads via `/api/upload`
2. Files saved to `public/uploads/`
3. URLs returned as absolute paths
4. Next.js Image component configured for local files

#### Component Structure
- **Server Components**: Default for pages
- **Client Components**: Only when interactivity needed
- **Shared Components**: Reusable UI elements in `src/components/`

### Environment Setup
Required `.env.local`:
```
JWT_SECRET=your-secret-key
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### Testing Strategy
- **Unit Tests**: Jest with React Testing Library
- **Security Tests**: Automated auth validation
- **Integration**: API endpoint testing via security test suite

### Production Considerations
- Data persists via JSON files in `data/` directory
- Images stored in `public/uploads/` (git-ignored)
- Port 3001 for dev, 3000 for production
- Default admin: admin/password123 (change immediately)