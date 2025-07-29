# Rick & Morty Application

A sophisticated full-stack application for managing Rick & Morty characters with secure authentication, role-based access control, and real-time data management.

## 🏗️ Architecture

This is a **monorepo** built with **Yarn 4 Workspaces** containing:

- **`packages/libs`**: Shared TypeScript types and schemas
- **`packages/backend`**: Express.js API server with TypeORM and PostgreSQL
- **`packages/frontend`**: React application with TypeScript and modern tooling

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **Yarn 4**
- **PostgreSQL** (or use Docker Compose)
- **Redis** (or use Docker Compose)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rick-morty-app

# Install dependencies
yarn install

# Set up environment variables
cp packages/backend/env.example packages/backend/.env
# Edit .env with your database credentials

# Start PostgreSQL and Redis (using Docker)
docker-compose up -d

# Build libs and start both servers
yarn dev
```

### Development

```bash
# Start both backend and frontend
yarn dev

# Start only backend
yarn dev:backend

# Start only frontend
yarn dev:frontend

# Run tests
yarn test              # Backend tests
yarn test:frontend     # Frontend tests

# Build for production
yarn build
```

## 📁 Project Structure

```
rick-morty-app/
├── packages/
│   ├── libs/                    # Shared types and schemas
│   │   ├── src/types/
│   │   │   ├── auth.ts         # Authentication types
│   │   │   └── character.ts    # Character types
│   │   └── dist/               # Built JavaScript files
│   │
│   ├── backend/                 # Express.js API server
│   │   ├── src/
│   │   │   ├── config/         # Database and logger config
│   │   │   ├── controllers/    # API controllers
│   │   │   ├── entities/       # TypeORM entities
│   │   │   ├── middleware/     # Auth, logging, error handling
│   │   │   ├── routes/         # API routes
│   │   │   ├── services/       # Business logic
│   │   │   └── errors/         # Custom error classes
│   │   └── tests/              # Backend tests
│   │
│   └── frontend/                # React application
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom React hooks
│       │   ├── pages/          # Page components
│       │   ├── services/       # API services
│       │   ├── stores/         # Zustand stores
│       │   └── tests/          # Integration tests
│       └── public/             # Static assets
│
├── docker-compose.yml          # PostgreSQL and Redis setup
└── package.json               # Root workspace config
```

## 🔧 Technology Stack

### Backend

- **Express.js** - Web framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **JWT** - Authentication
- **Pino** - Structured logging
- **Swagger** - API documentation
- **Vitest** - Testing framework

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Query** - Data fetching and caching
- **React Router** - Navigation
- **React Hook Form** - Form management
- **Styled Components** - Styling
- **Zustand** - State management
- **Vite** - Build tool

### Shared

- **Zod** - Schema validation
- **Yarn 4** - Package management
- **Monorepo** - Workspace management

## 🔐 Authentication & Authorization

### User Roles

- **`fan`**: Can view basic character information and manage favorites
- **`product_owner`**: Can view detailed character information and manage favorites

### API Endpoints

#### Authentication

- `POST /api/auth/register` - User registration with role selection
- `POST /api/auth/login` - User login

#### Characters

- `GET /api/characters` - List characters (basic info, any authenticated user)
- `GET /api/characters/:id` - Get character details (product owner only)
- `POST /api/characters/favorites` - Add character to favorites
- `DELETE /api/characters/favorites` - Remove character from favorites

## 🎯 Features

### Backend Features

- ✅ **Secure Authentication** with JWT tokens
- ✅ **Role-Based Access Control** (fan/product_owner)
- ✅ **Database Integration** with TypeORM and PostgreSQL
- ✅ **Caching Layer** with Redis (in-memory fallback for tests)
- ✅ **External API Integration** (Rick & Morty API)
- ✅ **Structured Logging** with Pino
- ✅ **API Documentation** with Swagger
- ✅ **Error Handling** with custom error classes
- ✅ **Test-Driven Development** with Vitest
- ✅ **Type Safety** with TypeScript

### Frontend Features

- ✅ **Modern React** with hooks and functional components
- ✅ **TypeScript** for type safety
- ✅ **Authentication System** with protected routes
- ✅ **Character Management** with favorites
- ✅ **Responsive Design** with flexbox and grid
- ✅ **Form Validation** with React Hook Form
- ✅ **State Management** with Zustand
- ✅ **Data Fetching** with React Query
- ✅ **Integration Tests** with React Testing Library

## 🧪 Testing

### Backend Tests

```bash
yarn test                    # Run all tests
yarn workspace @rick-morty-app/backend test:watch    # Watch mode
yarn workspace @rick-morty-app/backend test:coverage # Coverage report
```

### Frontend Tests

```bash
yarn test:frontend          # Run integration tests
yarn workspace @rick-morty-app/frontend test:watch   # Watch mode
```

## 🐳 Docker Setup

The application includes a `docker-compose.yml` file for easy local development:

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Stop services
docker-compose down
```

## 📚 API Documentation

Once the backend is running, visit:

- **Swagger UI**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/health

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

## 🔄 Development Workflow

1. **Start Services**: `docker-compose up -d`
2. **Install Dependencies**: `yarn install`
3. **Build Libs**: `yarn workspace @rick-morty-app/libs build`
4. **Start Development**: `yarn dev`
5. **Run Tests**: `yarn test && yarn test:frontend`

## 🚀 Production Deployment

```bash
# Build all packages
yarn build

# Start production servers
yarn workspace @rick-morty-app/backend start
yarn workspace @rick-morty-app/frontend preview
```

## 📝 Environment Variables

### Backend (.env)

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=rick_morty_app
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Ensure all tests pass before submitting
4. Use TypeScript for type safety
5. Follow the TDD approach for backend development

## 📄 License

This project is for educational purposes and demonstrates modern full-stack development practices.
