# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables (you can override these when running the container)
ENV PORT=8080
ENV NODE_ENV=production

# Start the server
CMD ["node", "index.js"]

