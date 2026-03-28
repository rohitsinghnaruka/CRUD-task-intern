# Build stage
FROM node:18-alpine as build-stage

WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy source code and build the React app via Vite
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

# Copy the built assets to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]




