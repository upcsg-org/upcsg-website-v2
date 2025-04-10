# Stage 1: Build Next.js App
FROM node:18 AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run Next.js in Production Mode
FROM node:18-alpine
WORKDIR /app

# Copy the built Next.js application from the builder stage
COPY --from=builder /app ./

# Set environment variables for production
ENV NODE_ENV=production

# Expose port 3000 (internally)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
