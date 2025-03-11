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

### Development

```bash
# Start development server
pnpm dev

# Lint code
pnpm lint

# Run tests
pnpm test
```

### Building

```bash
# Build for production
pnpm build
```
