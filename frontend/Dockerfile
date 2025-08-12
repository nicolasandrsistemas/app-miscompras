# Build stage
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Apache stage
FROM httpd:2.4
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/