# Rick & Morty Backend

A sophisticated backend application for Rick & Morty character management built with Express.js, TypeScript, and TypeORM.

## Features

- 🔐 **Secure Authentication System** - JWT-based authentication with bcrypt password hashing
- 👥 **User Management** - Support for 'fan' and 'product owner' roles
- 🎭 **Character Management** - Fetch and manage Rick & Morty characters
- ❤️ **Favorites System** - Users can mark characters as favorites
- 🔍 **Search & Filtering** - Advanced character search and filtering capabilities
- ⚡ **Caching System** - Redis-based caching with in-memory fallback for testing
- 📚 **API Documentation** - Complete OpenAPI/Swagger documentation
- 🧪 **Test-Driven Development** - Comprehensive test suite with BDD-style tests

## Architecture

The application follows the **MVC (Model-View-Controller)** pattern:

- **Models**: TypeORM entities (User, etc.)
- **Views**: JSON API responses
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Middleware**: Authentication and request processing

## Project Structure

```
src/
├── config/          # Database and application configuration
├── controllers/     # HTTP request handlers
├── entities/        # TypeORM database models
├── middleware/      # Express middleware (auth, etc.)
├── routes/          # API route definitions
├── services/        # Business logic services
│   ├── auth/        # Authentication services
│   ├── cache/       # Caching services
│   └── rickMorty/   # Rick & Morty API integration
└── test/           # Test setup and utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional, uses in-memory cache for development)

### Installation

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Copy environment file:

   ```bash
   cp env.example .env
   ```

3. Configure your environment variables in `.env`

4. Start the development server:
   ```bash
   yarn dev
   ```

### Database Setup

1. Create a PostgreSQL database
2. Update the database configuration in `.env`
3. The application will automatically create tables on startup (in development mode)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Characters

- `GET /api/characters` - Get all characters (with pagination and filtering)
- `GET /api/characters/:id` - Get character by ID
- `GET /api/characters/search?q=query` - Search characters
- `POST /api/characters/favorites` - Add character to favorites (authenticated)
- `DELETE /api/characters/favorites` - Remove character from favorites (authenticated)

### Documentation

- `GET /api-docs` - Swagger UI documentation

## Testing

Run the test suite:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

The tests follow **BDD (Behavior-Driven Development)** style with Given-When-Then structure.

## Caching Strategy

The application implements a two-tier caching system:

1. **Redis Cache** (Production) - Persistent, distributed caching
2. **In-Memory Cache** (Development/Testing) - Fast, local caching

Cache keys follow the pattern:

- `characters:page:{page}` - Character list pages
- `character:{id}` - Individual characters
- `search:{query}` - Search results

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **CORS Protection** - Configurable cross-origin resource sharing
- **Helmet Security** - HTTP security headers
- **Input Validation** - Zod schema validation
- **Rate Limiting** - Protection against abuse (can be added)

## Environment Variables

| Variable      | Description          | Default                  |
| ------------- | -------------------- | ------------------------ |
| `PORT`        | Server port          | `3001`                   |
| `NODE_ENV`    | Environment mode     | `development`            |
| `DB_HOST`     | Database host        | `localhost`              |
| `DB_PORT`     | Database port        | `5432`                   |
| `DB_USERNAME` | Database username    | `postgres`               |
| `DB_PASSWORD` | Database password    | `postgres`               |
| `DB_NAME`     | Database name        | `rick_morty_app`         |
| `JWT_SECRET`  | JWT signing secret   | `default-secret`         |
| `REDIS_URL`   | Redis connection URL | `redis://localhost:6379` |

## Development

### Code Quality

- **TypeScript** - Strict type checking
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting (can be added)

### Build

```bash
# Build for production
yarn build

# Type checking
yarn typecheck
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database and Redis
3. Set secure `JWT_SECRET`
4. Build the application: `yarn build`
5. Start the server: `yarn start`

## Contributing

1. Write tests first (TDD approach)
2. Follow the existing code structure
3. Ensure all tests pass
4. Update documentation as needed

## License

This project is part of the Rick & Morty application challenge.
