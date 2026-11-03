# Multi-stage production build for AusEdu Connect API (NestJS + Prisma)
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat python3 make g++ openssl

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root monorepo files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/api/package.json ./packages/api/

# Install dependencies
RUN pnpm install --filter aus-edu-api... --frozen-lockfile

# Copy Prisma schema and generate client
COPY packages/api/prisma ./packages/api/prisma
RUN cd packages/api && npx prisma generate --schema=./prisma/schema.prisma

# Copy source and build
COPY packages/api ./packages/api
RUN cd packages/api && pnpm run build

# Production runtime stage
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace & package files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/api/package.json ./packages/api/

# Install production dependencies
RUN pnpm install --prod --filter aus-edu-api... --frozen-lockfile

# Copy Prisma schema and generated client
COPY --from=builder /app/packages/api/prisma ./packages/api/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/packages/api/node_modules/.prisma ./packages/api/node_modules/.prisma
COPY --from=builder /app/packages/api/node_modules/@prisma ./packages/api/node_modules/@prisma

# Copy built application & entrypoint
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY packages/api/entrypoint.sh ./packages/api/entrypoint.sh
RUN chmod +x ./packages/api/entrypoint.sh

WORKDIR /app/packages/api

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]

