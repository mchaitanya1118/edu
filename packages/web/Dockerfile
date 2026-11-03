# Multi-stage production build for AusEdu Connect Web (React + Vite)
FROM node:20-alpine AS builder

WORKDIR /app

# Ensure devDependencies (Vite, TypeScript, Tailwind) are installed during build
ENV NODE_ENV=development

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root monorepo files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/web/package.json ./packages/web/

# Install dependencies for web
RUN pnpm install --prod=false --filter aus-edu-connect-web... --frozen-lockfile

# Copy web source files
COPY packages/web ./packages/web

# Build static assets
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

RUN cd packages/web && pnpm run build

# ------------------------------------------------------------------------------
# Nginx production runner
# ------------------------------------------------------------------------------
FROM nginx:alpine AS runner

COPY --from=builder /app/packages/web/dist /usr/share/nginx/html
COPY packages/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
