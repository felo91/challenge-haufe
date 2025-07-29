# Rick & Morty Application

A sophisticated full-stack application for managing Rick & Morty characters with secure authentication, role-based access control, and real-time data management.

## Architecture

This is a **monorepo** built with **Yarn 4 Workspaces** containing:

- **`packages/libs`**: Shared TypeScript types and schemas
- **`packages/backend`**: Express.js API server with TypeORM and PostgreSQL
- **`packages/frontend`**: React application with TypeScript and modern tooling

## Quick Start

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

### Testing

```bash
yarn test                    # Run all tests
yarn workspace @rick-morty-app/frontend test    # Basic FE/BE integration tests
yarn workspace @rick-morty-app/backend test    # Backend tests
yarn workspace @rick-morty-app/backend test:coverage # BE Coverage report
```

## Docker Setup

The application includes a `docker-compose.yml` file for easy local development:

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Stop services
docker-compose down
```

## API Documentation

Once the backend is running, visit:

- **Swagger UI**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/health

## Local Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

## Development Workflow

1. **Start Services**: `docker-compose up -d`
2. **Install Dependencies**: `yarn install`
3. **Build Libs**: `yarn workspace @rick-morty-app/libs build`
4. **Start Development**: `yarn dev`
5. **Run Tests**: `yarn test && yarn test:frontend`

## Environment Variables

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
