# edu

## AusEdu Connect — Australian International Education Platform

Multi-tenant B2B education marketplace for Australian education agencies, CRICOS colleges, and RTOs.

### Tech Stack
- **Frontend**: React 18, Vite, React Router v6, Tailwind CSS, Lucide Icons
- **Backend API**: NestJS, Prisma ORM, PostgreSQL 16, Redis 7
- **Deployment**: Docker Compose & Coolify ready for Hostinger VPS

### Quick Start
```bash
# Install dependencies
pnpm install

# Run development servers (API on :4000, Web on :5173)
pnpm run dev

# Build for production
pnpm run build
```

### Docker & Coolify Deployment
See [COOLIFY_HOSTINGER_DEPLOYMENT.md](./COOLIFY_HOSTINGER_DEPLOYMENT.md) for complete instructions.
