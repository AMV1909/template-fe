# 📋 Next.js Full-Stack Template

A production-ready Next.js template with authentication, internationalization, and CRUD operations. Perfect for building modern web applications with TypeScript, Firebase Auth, and a RESTful API backend.

## 🎯 Template Overview

This template provides a complete foundation for building full-stack applications with:

- ✅ User authentication (Firebase)
- ✅ CRUD operations with API integration
- ✅ Multi-language support (i18n)
- ✅ Form validation and error handling
- ✅ Image upload functionality
- ✅ E2E testing setup
- ✅ Type-safe development with TypeScript and Zod
- ✅ Modern UI components (Radix UI + Tailwind CSS)
- ✅ State management (Zustand + React Query)

## 🚀 Tech Stack

### Core

- **Framework:** Next.js
- **UI Library:** React
- **Language:** TypeScript
- **Runtime:** Bun
- **Styling:** Tailwind CSS

### Key Libraries

- **UI Components:** Radix UI (Dialog, Popover, Select, Slot)
- **Icons:** Lucide React
- **Forms Validation:** Zod and React Hook Form
- **HTTP Client:** Axios
- **Global State:** Zustand
- **Authentication:** Firebase
- **Internationalization:** next-intl
- **Notifications:** React Hot Toast
- **CSS Utilities:** clsx, tailwind-merge, class-variance-authority

### Testing

- **E2E Testing:** Playwright
- **Test Runners:** @playwright/test

### DevTools

- **Linting:** ESLint + eslint-plugin-jsx-a11y
- **Formatting:** Prettier + prettier-plugin-tailwindcss
- **Debug Tools:** React Query Devtools, React Scan, Click-to-React-Component

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   └── [locale]/                 # i18n routes
│       ├── page.tsx              # Home page (todos list)
│       ├── login/                # Login page
│       ├── sign-up/              # Sign up page
│       └── reset-password/       # Password recovery
│
├── features/                     # Feature-based modules
│   ├── todos/                    # Todo management
│   │   ├── AddOrEditTodoModal.tsx
│   │   ├── TodoBadgeStatus.tsx
│   │   ├── TodoCard.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoList.tsx
│   │   ├── todosSchemas.ts       # Zod schemas
│   │   └── useTodos.ts           # React Query hook
│   ├── login/                    # Authentication
│   ├── sign-up/                  # User registration
│   ├── reset-password/           # Password recovery
│   └── users/                    # User schemas
│
├── shared/                       # Shared code
│   ├── auth/                     # Auth provider
│   ├── components/               # Reusable components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Dialog.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── ...
│   ├── constants/                # Global constants
│   ├── helpers/                  # Helper functions
│   ├── hooks/                    # Custom hooks
│   ├── schemas/                  # Shared schemas
│   ├── store/                    # Zustand store
│   ├── types/                    # TypeScript types
│   └── utils/                    # Utilities (axios, routes, cn)
│
├── config/                       # Configuration files
│   ├── env.ts                    # Environment variables
│   ├── firebase.ts               # Firebase config
│   └── reactScan.ts              # React Scan config
│
├── i18n/                         # i18n configuration
│   └── routing.ts                # Routes and locales
│
├── messages/                     # Translation files
│   ├── en.json                   # English
│   └── es.json                   # Spanish
│
├── e2e/                          # E2E tests
│   ├── auth.setup.ts             # Authentication setup
│   ├── home.spec.ts              # Home tests
│   ├── login.spec.ts             # Login tests
│   ├── sign-up.spec.ts           # Sign up tests
│   └── reset-password.spec.ts    # Password recovery tests
│
├── public/                       # Static assets
├── next.config.ts                # Next.js config
├── playwright.config.ts          # Playwright config
└── tailwind.config.ts            # Tailwind config
```

## ✨ Features

### 🔐 Authentication

- Email/password authentication with Firebase
- User registration with validation
- Password recovery flow
- Session persistence
- Protected routes with automatic redirects

### 📝 CRUD Operations (Todo Example)

- Create, read, update, and delete operations
- Status management (TODO, IN_PROGRESS, COMPLETED)
- Image upload (Cloudflare R2 integration)
- Infinite scroll pagination
- Search and filtering
- Form validation with Zod

### 🌍 Internationalization

- Multi-language support (English/Spanish)
- Dynamic language switching
- Localized routes (`/en/...`, `/es/...`)
- Type-safe translations

### 🎨 UI/UX

- Responsive design (Desktop & Mobile)
- Accessible components (Radix UI)
- Toast notifications
- Loading states
- Real-time validation
- Dark mode ready

## 🛠️ Getting Started

### Prerequisites

- **Bun** installed ([https://bun.sh](https://bun.sh))
- **Node.js** 20+ (optional, Bun replaces it)
- **Firebase** account for authentication
- Backend API running (default: `http://localhost:5000`)

### Environment Variables

Create a `.env.local` file in the project root:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# LogRocket
NEXT_PUBLIC_LOGROCKET_APP_ID=your_logrocket_app_id
```

### Installation

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Run E2E development server
bun run dev:e2e
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### E2E Tests with Playwright

```bash
# Run all tests
bun run e2e

# Run tests in UI mode
bunx playwright test --ui

# Run specific test file
bunx playwright test e2e/login.spec.ts

# View test report
bunx playwright show-report
```

### Test Projects

- **Setup**: Pre-authentication for tests
- **Desktop Chrome**: Tests with authenticated session
- **Mobile Chrome (Pixel 5)**: Mobile tests
- **Desktop Chrome - No Auth**: Tests without authentication (login, signup)

## 📦 Available Scripts

```bash
# Development
bun dev              # Start development server (port 3000)
bun run dev:e2e      # Start E2E server

# Production
bun run build        # Build for production
bun start            # Start production server

# Code Quality
bun run lint         # Run ESLint

# Testing
bun run e2e          # Run E2E tests with Playwright
```

## 🏗️ Architecture

### Feature-Based Pattern

Each feature groups related logic:

- UI Components
- Custom hooks
- Validation schemas (Zod)
- TypeScript types

### State Management

- **Zustand**: Global state (user, hydration)
- **React Query**: Server state, cache, and synchronization
- **React Hook Form**: Form state management

### Validation

- **Zod**: Type-safe schemas for:
    - Forms (login, signup, todos)
    - API responses
    - Environment variables
    - File uploads

### Internationalization

- **next-intl**: Translations and localized routes
- Multi-language support without reloads
- Type-safe translations with TypeScript

### Routing

- **App Router** from Next.js
- Dynamic routes with `[locale]`
- Middleware for language redirects

## 🔒 Authentication Flow

Authentication uses **Firebase Authentication**:

1. User submits credentials
2. Firebase validates and returns token
3. Token is sent to backend on each request
4. Backend validates token and returns data
5. User state stored in Zustand

### Route Protection

- Public routes: `/login`, `/sign-up`, `/reset-password`
- Private routes: `/` (home/todos)
- Automatic redirect if not authenticated

## 🎨 Design System

### Base Components

All components follow the **Radix UI + Tailwind CSS** pattern:

- Built-in accessibility (ARIA)
- Variants with `class-variance-authority`
- Flexible composition
- Consistent styling

### Utilities

- **cn()**: Combines classes with `clsx` and `tailwind-merge`
- **badgeVariants**: Variant system for badges
- **buttonVariants**: Variant system for buttons

## 📡 API Integration

### Axios Configuration

- Base URL from environment variables
- Authentication interceptors
- Query params serialization
- Centralized error handling

### API Routes

```typescript
authRoutes.signUp(); // POST /auth/sign-up
authRoutes.login(); // POST /auth/login

todosRoutes.getTodos(); // GET /todos
todosRoutes.getTodo(id); // GET /todos/:id
todosRoutes.createTodo(); // POST /todos
todosRoutes.updateTodo(id); // PATCH /todos/:id
todosRoutes.deleteTodo(id); // DELETE /todos/:id
```

## 🚀 Deployment

### Production Build

```bash
bun run build
```

### Required Environment Variables

Make sure to configure all environment variables in your deployment platform (Vercel, Netlify, etc.)

### Image Configuration

The project is configured to use **Cloudflare R2** for image storage:

- Cache TTL: 30 days
- Formats: WebP, AVIF
- Domain configured in `next.config.ts`

## 🔧 Customization Guide

### Adding New Features

1. Create a new folder in `features/`
2. Add components, hooks, and schemas
3. Define types with Zod schemas
4. Create API routes in `shared/utils/routes.ts`

### Adding New Languages

1. Add locale to `i18n/routing.ts`
2. Create translation file in `messages/` (e.g., `fr.json`)
3. Copy structure from existing translation files

### Modifying the Data Model

1. Update Zod schemas in feature folder
2. TypeScript types are auto-generated from schemas
3. Update API integration if needed

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Code Conventions

- **ESLint** for linting
- **Prettier** for formatting
- **TypeScript** strict mode
- Components in PascalCase
- Hooks prefixed with `use`
- Schema files suffixed with `Schemas.ts`

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives)
- [Zod Documentation](https://zod.dev)
- [React Hook Form](https://react-hook-form.com)
- [Playwright Testing](https://playwright.dev)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Use Cases

This template is perfect for:

- SaaS applications
- Internal tools and dashboards
- Content management systems
- E-commerce platforms
- Social networking apps
- Any CRUD-based application

## 🎯 What's Included

✅ Authentication system ready to use  
✅ CRUD operations example (Todos)  
✅ Multi-language support out of the box  
✅ Form validation with error messages  
✅ File upload functionality  
✅ Responsive design for all devices  
✅ E2E testing infrastructure  
✅ Type-safe development environment  
✅ Production-ready configuration  
✅ Modern UI components library

## 🙏 Acknowledgments

Built with modern best practices and inspired by the Next.js and React communities.

---

**Ready to start building?** Fork this template and customize it for your next project! 🚀
