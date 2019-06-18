# Install node v10
FROM node:10

# Create necessary filesystem
RUN mkdir -p /var/www/.ambar/Build/Public

# Set the workdir /var/www/myapp
WORKDIR /var/www/.ambar

# Copy application source
COPY ./Server ./Server
COPY ./Client ./Client
COPY ./Admin ./Admin
COPY ./.env ./.env

# Install dependencies and generate build.
RUN npm run docked

# Start the application
CMD ["npm", "start"]