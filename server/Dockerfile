# Use Node.js LTS (Long Term Support) version
# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Create app directory and set permissions
WORKDIR /app
RUN chown node:node /app

# Switch to non-root user
USER node

# Copy package.json and package-lock.json (if available)
COPY --chown=node:node package*.json ./

# Install dependencies
# Using npm ci for cleaner, more reliable builds (requires package-lock.json)
# If package-lock.json doesn't exist, fallback to npm install would be manual, but we assume it exists.
# We'll use npm install for flexibility in this environment if lockfile is missing or out of sync.
RUN npm install

# Copy source code
COPY . .

# Expose API port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
