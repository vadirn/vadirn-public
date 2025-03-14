# vadirn

Personal website and blog monorepo powered by SvelteKit.

## Project Structure

This project is organized as a monorepo using pnpm workspaces:

- `apps/web`: Main SvelteKit application
- `core`: Core services and utilities
- `domain`: Domain-specific business logic
- `libs`: Reusable libraries
- `tools`: Development and build tools
- `ui`: UI components and theme

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm `pnpm@10.6.1`

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory. Check `.env.example` for expected variables.

Run the environment setup tool to create symlinks:

```bash
pnpm symlink-env
```

This will create symlinks to the root `.env` file in all required project directories.

### Development

```bash
# Start development server
pnpm dev

# Lint code
pnpm lint

# Run tests
pnpm test
```

### Database

The project uses [Neon](https://neon.tech) (serverless Postgres) with Drizzle ORM. Make sure you have the database URL set in your `.env` file:

```
DATABASE_URL=postgresql://username:password@your-neon-db-url/dbname
```

Available commands:

```bash
# Push schema changes to the database
pnpm db:push

# Open Drizzle Studio to manage data
pnpm db:studio
```

### Building

```bash
# Build for production
pnpm build
```
