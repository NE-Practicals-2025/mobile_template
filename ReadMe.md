# EventHub - NE Mobile Template

Welcome to the NE Mobile template! This is a starter template built with Expo Router to help you quickly finish your mobile NE. Here's how to get started:

## Features

- Expo Router for navigation
- Pre-configured tab navigation
- Integrated Auth (Login & Sign up + Logout)
- API hooks for data fetching
- Modern UI with Tailwind CSS
- TypeScript support
- Secure token storage
- Form validation
- Error handling

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
├── app/                    # Main application routes and screens
│   ├── (auth)/            # Authentication related screens
│   ├── (tabs)/            # Tab navigation screens
│   └── _layout.tsx        # Root layout configuration
│
├── components/            # Reusable UI components
│   ├── core/             # Core UI elements (icons, buttons)
│   └── ui/               # Complex UI components
│
├── contexts/             # React Context providers
│   └── auth.context.tsx  # Authentication context
│
├── hooks/               # Custom React hooks
│   ├── useGet/             # All Data fetching
│   └── usePost               # For handling fetching, deleting posts (like in 2024 NE )
│
├── lib/                # Utility libraries
│   └── api.ts         # API configuration
│
├── services/          # Business logic services
│   └── auth.service.ts # Authentication service
│
├── styles/           # Global styles and theme
│
└── types/           # TypeScript type definitions
```

## Directory Details

### `/app`

Contains all the routes and screens using Expo Router's file-based routing:

- `(auth)`: Login and registration screens
- `(tabs)`: Main app tabs including home, profile, etc.
- `_layout.tsx`: Root layout with authentication and theme providers

### `/components`

Reusable UI components organized by complexity:

- `core`: Basic UI elements like icons and buttons
- `ui`: More complex components like forms and cards

### `/contexts`

React Context providers:

- `auth.context.tsx`: Manages authentication state and user information
- Provides login, register, and logout functionality

### `/hooks`

Custom React hooks:

- `useGet`: Hook for making GET requests to the API
- Other utility hooks for common functionality

### `/lib`

Utility libraries and configurations:

- `api.ts`: Axios instance setup and API configurations
- Other helper functions and utilities

### `/services`

Business logic and API services:

- `auth.service.ts`: Handles authentication operations
- Token management and storage

### `/styles`

Global styles and theme configuration:

- Tailwind CSS configuration
- Custom fonts and colors

## Authentication

The template includes a complete authentication system:

- Secure token storage using expo-secure-store
- Protected routes
- Login and registration forms with validation
- Automatic redirect based on auth state

## API Integration

Built-in API integration features:

- Axios-based API client
- Authentication token management
- Error handling
- Loading states

## UI/UX Features

- Modern design with Tailwind CSS
- Form validation
- Loading states
- Error handling
- Responsive layouts
- Custom icons

## Contributing

Feel free to submit issues and enhancement requests!
