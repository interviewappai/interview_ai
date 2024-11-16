FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Add this to verify env during build
RUN echo "Building with environment:" && env

# Build with explicit mode
RUN npm run build