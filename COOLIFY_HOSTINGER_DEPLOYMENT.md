# 🚀 AusEdu Connect — Deployment Guide for Hostinger VPS with Coolify

This guide walks you through deploying **AusEdu Connect** (React 18 + Vite frontend, NestJS backend, PostgreSQL 16, Redis 7) onto a **Hostinger VPS** using **Coolify**.

---

## 📋 Overview Architecture on Coolify

```
                                  [ Internet / Browser ]
                                            │
                                            ▼
                          [ Traefik (Coolify Reverse Proxy) ]
                             (Automatic SSL / Let's Encrypt)
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
         [ aus-edu-web (Nginx) ]                          [ aus-edu-api (NestJS) ]
         Port 80 (React 18 SPA)                                 Port 4000
                    │                                               │
                    └──────────> /api/ requests ────────────────────┤
                                                                    ▼
                                                    [ PostgreSQL 16 & Redis 7 ]
                                                      (Internal Docker Network)
```

---

## Step 1: Prepare Your Hostinger VPS

1. Log in to your [Hostinger Control Panel (hPanel)](https://hpanel.hostinger.com/).
2. Navigate to **VPS** -> Select your VPS instance.
3. Recommended Configuration:
   * **OS**: Ubuntu 22.04 64-bit or Ubuntu 24.04 64-bit.
   * **Minimum Plan**: KVM 2 (4 GB RAM, 2 vCPUs) or KVM 4 for production.
4. Note your **VPS IP Address** (e.g., `123.45.67.89`).

---

## Step 2: Install Coolify on Your Hostinger VPS

1. Connect to your Hostinger VPS via SSH from your terminal:
   ```bash
   ssh root@<YOUR_HOSTINGER_VPS_IP>
   ```

2. Update your packages:
   ```bash
   apt update && apt upgrade -y
   ```

3. Run the official Coolify 1-line installation script:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```

4. Once the installation completes (typically 2–3 minutes), open your browser and navigate to:
   ```
   http://<YOUR_HOSTINGER_VPS_IP>:8000
   ```

5. Complete the initial registration by creating your **Admin Account** (Email & Password).

---

## Step 3: Point Your Domain (DNS Setup)

In your domain registrar (Hostinger DNS Management, Cloudflare, Namecheap, etc.):

1. Add an **A Record**:
   * **Type**: `A`
   * **Name**: `@` (or subdomain like `app` or `portal`)
   * **Value**: `<YOUR_HOSTINGER_VPS_IP>`
   * **TTL**: Automatic or 300s
2. (Optional) If you want API on a separate subdomain like `api.yourdomain.com`:
   * **Type**: `A`
   * **Name**: `api`
   * **Value**: `<YOUR_HOSTINGER_VPS_IP>`

---

## Step 4: Push the Project to GitHub / Git

Make sure your project repository is committed and pushed to GitHub or GitLab:

```bash
git add .
git commit -m "feat: configure production Docker and Coolify compose stack"
git push origin main
```

---

## Step 5: Create the Project in Coolify

1. Inside your Coolify dashboard (`http://<YOUR_VPS_IP>:8000`):
2. Click **Projects** in the left sidebar -> **+ Add Project**.
3. Name it: `AusEdu Connect`.
4. Click into the project -> Select the default **Environment** (e.g. `production`).
5. Click **+ Add Resource** -> Choose **Git Repository** (GitHub or Private Repository via Deploy Key).
6. Select your repository: `aus-edu-connect` (branch: `main`).
7. Coolify will inspect the repository and ask how to deploy:
   * Select **Docker Compose**.

---

## Step 6: Configure Environment Variables in Coolify

Inside your newly created application in Coolify, go to the **Environment Variables** tab and paste the following values (customized for your setup):

```env
# Database
DB_NAME=aus_edu_connect
DB_USER=aus_edu
DB_PASSWORD=YOUR_STRONG_SECURE_PASSWORD_HERE!

# JWT Secrets (Generate with: openssl rand -base64 32)
JWT_SECRET=YOUR_RANDOM_32_CHAR_JWT_SECRET_HERE!
JWT_REFRESH_SECRET=YOUR_RANDOM_32_CHAR_REFRESH_SECRET_HERE!
JWT_EXPIRY_MINUTES=60
JWT_REFRESH_EXPIRY_DAYS=30

# Domain & CORS
CORS_ORIGINS=https://yourdomain.com,http://localhost:5173
VITE_API_URL=/api

# Ports
WEB_PORT=80
API_PORT=4000
```

*Click **Save**.*

---

## Step 7: Configure Domains & SSL

1. In Coolify, under the **General** configuration of your Docker Compose service:
2. For the **`web`** service, enter your public domain URL:
   ```
   https://yourdomain.com
   ```
   *(or `https://app.yourdomain.com`)*
3. Coolify automatically configures **Traefik** to provision and renew a free **Let's Encrypt SSL certificate** for your domain.

---

## Step 8: Deploy & Verify

1. Click the **Deploy** button in the top right corner of Coolify.
2. Coolify will:
   * Pull PostgreSQL 16 & Redis 7 images.
   * Build the NestJS API container using `packages/api/Dockerfile`.
   * Automatically run Prisma database migrations (`npx prisma migrate deploy`).
   * Build the React 18 + Vite frontend into Nginx using `packages/web/Dockerfile`.
   * Start Traefik routing with SSL.
3. Monitor the live build logs in the **Deployments** tab.
4. Once completed, visit `https://yourdomain.com` in your browser!

---

## 🛠️ Post-Deployment Tips & Commands

### 1. Seeding the Database (Optional)
If you want to run the seed script to populate initial sample institutions, run from the Coolify Terminal or SSH into your VPS:
```bash
docker exec -it aus-edu-api npx ts-node -r tsconfig-paths/register src/prisma/seed.ts
```

### 2. Viewing Live Logs
In Coolify: Click on any service (`api`, `web`, `postgres`, `redis`) -> **Logs** tab.

### 3. Automatic Deployments
Under the **Webhooks** tab in Coolify, enable **Auto-deploy on Git push** so any future commits to `main` trigger a zero-downtime rolling update automatically!

