# =========================================
# Stage 1: Build the Nuxt.js Application
# =========================================
# Use a compatible Node.js version
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Update npm to the latest version
RUN npm install -g npm@11.6.2

# Install project dependencies
RUN npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the Nuxt.js application for production
RUN npm run build

# =========================================
# Stage 2: Serve the Nuxt.js Application
# =========================================
# Use a lightweight Node.js image for serving
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app/.output .output

# Install a lightweight HTTP server (e.g., serve)
RUN npm install -g serve

# Expose the port used by the server
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", ".output"]
