# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

### 说中文！！！！！！！！！

## Project Overview

AInovalife is a modern personal website system built with Next.js 15 and TypeScript, featuring comprehensive admin functionality and robust security mechanisms. The system includes dynamic content management, article system, project showcase, contact forms, and donation/support features.

## Key Commands

### Development
- `npm run dev` - Start development server on port 3001
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:security` - Run security tests (node scripts/security-test.js)

### Environment Setup
- Copy `.env.example` to `.env.local` for environment variables
- Default admin: `admin` / `password123`
- Default port: 3001 (configured in package.json)

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: JWT (jose library)
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

### Security Architecture
- **JWT Authentication**: 24-hour token expiration with HttpOnly cookies
- **Middleware Protection**: Automatic redirection for unauthenticated admin routes
- **Multi-layer Security**: Client, server, and middleware protection
- **Cookie Security**: HttpOnly + Secure + SameSite Strict
- **Route Protection**: All `/admin/*` routes protected except `/admin/login`

### File Structure
```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard routes
│   ├── api/               # API endpoints
│   ├── posts/             # Public post pages
│   ├── projects/          # Project showcase
│   └── ...
├── components/            # Reusable React components
├── lib/                   # Core utilities
│   ├── auth.ts           # JWT authentication
│   ├── data.ts           # Data management
│   └── markdown.ts       # Markdown processing
├── types/                 # TypeScript definitions
└── middleware.ts          # Route protection
```

### Key Components

#### Authentication System (src/lib/auth.ts)
- `generateToken(payload)` - Create JWT tokens
- `verifyToken(token)` - Validate JWT tokens
- `authenticateRequest(request)` - API route authentication
- `setAuthCookie(response, token)` - Secure cookie handling

#### Data Management
- Global variable persistence for:
  - `siteSettings` - Site configuration
  - `posts` - Article data
  - `contacts` - Contact information
  - `messages` - User messages
  - `aboutData` - Personal information
  - `adminAccount` - Admin credentials

#### API Structure
- **Admin routes**: `/api/admin/*` (JWT protected)
- **Public routes**: `/api/posts`, `/api/contact`, etc.
- **File uploads**: `/api/upload` for images
- **Settings**: `/api/settings` for site configuration

### Development Patterns

#### Adding New Features
1. Create API route in `src/app/api/`
2. Create component in `src/components/`
3. Create page in `src/app/`
4. Update types in `src/types/index.ts`

#### Testing Structure
- Unit tests in `src/__tests__/`
- Security tests in `scripts/security-test.js`
- Jest configuration in `jest.config.js`
- Setup file: `jest.setup.js`

#### Type Definitions
- Posts: `Post` interface with AI/Nova/Life categories
- Projects: `Project` interface with technology tags
- Messages: `Message` interface for contact forms
- Settings: `SiteSettings` for site configuration

### Environment Variables
```bash
JWT_SECRET=your-secret-key
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### Security Notes
- All admin routes require authentication via middleware
- JWT tokens expire after 24 hours
- File uploads limited to images
- Input validation on all API endpoints
- Secure cookie configuration for production

### Common Tasks
- **Content Management**: Use admin dashboard at `/admin`
- **Image Uploads**: Via `/api/upload` endpoint
- **Settings Updates**: Via `/api/settings` endpoint
- **Testing**: Run security tests after authentication changes