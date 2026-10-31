# ApplyLens — System Architecture

## 1. Architecture Pattern

Modular Monolith.

The application uses a separate React frontend
and Node.js backend with logically separated modules.

## 2. Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- TanStack Query

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- Zod

### Database
- PostgreSQL
- pgvector

### AI
- LLM API
- Embedding API
- Retrieval-Augmented Generation (RAG)

### File Storage
- Private object storage

## 3. Main Components

### Frontend
Responsible for user interface, navigation,
forms, dashboards and displaying API responses.

### Backend
Responsible for authentication, authorization,
validation, business logic and API endpoints.

### Database
Stores users, profiles, opportunities,
requirements, applications and document metadata.

### AI Layer
Handles requirement extraction, document analysis,
embeddings and question answering.

### File Storage
Stores uploaded PDF documents privately.

## 4. Communication Flow

1. Frontend communicates with backend through REST APIs.
2. Backend validates incoming requests.
3. Backend communicates with PostgreSQL.
4. Backend calls external AI services when required.
5. Backend accesses private file storage.
6. Backend returns validated responses to frontend.

## 5. Security

- HTTP-only secure session cookies.
- Password hashing.
- Request validation.
- Role-based authorization where required.
- Protected API endpoints.
- Server-side API keys.
- Private document storage.
- File type and size validation.
- Rate limiting.
- User-scoped document access.

## 6. Architectural Principles

- Modular code organization.
- Separation of concerns.
- Reusable components.
- Centralized error handling.
- Secure data access.
- AI features must not block core functionality.
