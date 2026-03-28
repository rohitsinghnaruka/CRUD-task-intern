FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Run npm ci instead of install for reproducible, faster production builds
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]



