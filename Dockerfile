# ---------- Build Stage: Compile Nuxt App ----------
FROM node:22-slim AS builder

WORKDIR /app
ENV NODE_ENV=development

RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false || npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ---------- Runner Stage: Combine Nuxt runtime and Nginx server in one image ----------
FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# Install Nginx and production dependencies, clean up after
RUN apt-get update && apt-get install -y nginx curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy built output and package files from the builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Install only production dependencies for Nuxt runtime
RUN npm install --omit=dev

# Replace the default Nginx configuration file with your custom one
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# The container will run as root (default), avoiding all permission errors
CMD ["sh", "-c", "nginx && node .output/server/index.mjs"]
