FROM node:16.14.0-alpine3.15

WORKDIR /app
COPY package*.json ./
RUN NODE_ENV=development npm ci
COPY . .