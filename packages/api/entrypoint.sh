#!/bin/sh
set -e

echo "==> Running database migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma

echo "==> Starting AusEdu Connect API..."
exec node dist/main.js

