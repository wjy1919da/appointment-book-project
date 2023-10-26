# # Use an official Node runtime as a parent image
# FROM node:16-alpine3.17

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./
# # Install dependencies
# RUN npm install
# # Copy the rest of the application code to the container
# COPY . .
# # Build the production version of the application
# RUN npm run build
# # Expose port 80 to the outside world
# EXPOSE 3000
# # Run the command to start the server
# CMD ["npm", "start"]


# Stage 1 - the build process
FROM node:16 as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm install
COPY . ./
RUN yarn install
RUN yarn run build

# RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17.0-alpine
# copy nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
