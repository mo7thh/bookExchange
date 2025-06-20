# client/Dockerfile

# 1. Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production stage using Nginx
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Nginx will serve on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
