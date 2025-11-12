# ---------- Build stage ----------
FROM node:22-slim AS builder

# Install system dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=development

# Copy package files first
COPY package*.json ./

# Clean, reproducible install
RUN npm ci --prefer-offline --no-audit --progress=false || npm install --legacy-peer-deps

# Copy project source
COPY . .

# Load environment variables via build arguments
# These will be passed during docker build
ARG NUXT_PUBLIC_API_BASE_URL
ARG NUXT_PUBLIC_MEDIA_BASE_URL
ARG NUXT_GOOGLE_CLIENT_ID
ARG NUXT_SESSION_PASSWORD

# Set them as environment variables so Nuxt can see them
ENV NUXT_PUBLIC_API_BASE_URL=$NUXT_PUBLIC_API_BASE_URL
ENV NUXT_PUBLIC_MEDIA_BASE_URL=$NUXT_PUBLIC_MEDIA_BASE_URL
ENV NUXT_GOOGLE_CLIENT_ID=$NUXT_GOOGLE_CLIENT_ID
ENV NUXT_SESSION_PASSWORD=$NUXT_SESSION_PASSWORD

# Build Nuxt app (fresh build, ensures new code is used)
RUN rm -rf .output && npm run build

# ---------- Production stage ----------
FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN useradd -m appuser
USER appuser

# Copy built output & package metadata
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

EXPOSE 3000
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
