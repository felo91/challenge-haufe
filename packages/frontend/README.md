# Rick & Morty Frontend

A React-based frontend application for the Rick & Morty character management system.

## Features

- **Authentication System**: Secure login and registration with role-based access
- **Character Management**: View and manage Rick & Morty characters
- **Favorite System**: Add/remove characters from favorites
- **Role-Based Access**: Different features for 'fan' and 'product owner' roles
- **Responsive Design**: Modern UI with styled-components
- **Real-time Data**: React Query for efficient data fetching and caching

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **React Query (TanStack Query)** for data fetching
- **React Hook Form** for form management
- **Styled Components** for styling
- **Zustand** for state management
- **Axios** for API communication

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 4
- Backend server running on port 3001

### Installation

```bash
# Install dependencies (from project root)
yarn install

# Start the development server
yarn dev
```

The frontend will be available at `http://localhost:3000`

### Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch
```

## Project Structure

```
src/
├── components/
│   ├── guards/          # Route protection components
│   └── styled/          # Styled components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API services
├── stores/              # Zustand stores
└── tests/               # Integration tests
```

## API Integration

The frontend communicates with the backend API through:

- `/api/auth/*` - Authentication endpoints
- `/api/characters/*` - Character management endpoints

All requests are automatically authenticated using JWT tokens stored in Zustand.

## Features

### Authentication

- User registration with role selection (fan/product owner)
- Secure login with JWT tokens
- Protected routes with authentication guards
- Automatic logout on token expiration

### Character Management

- View character list with pagination
- Add/remove characters from favorites
- Role-based access to detailed character information
- Real-time favorite status updates

### User Experience

- Loading states and error handling
- Responsive design with flexbox and grid
- Form validation with React Hook Form
- Optimistic updates with React Query
