FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY index.html .
COPY vite.config.js .
COPY src ./src
COPY .env .
COPY public ./public

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN mkdir /usr/share/nginx/html/lk
RUN cp -r /usr/share/nginx/html/assets /usr/share/nginx/html/lk/assets

COPY nginx.conf /etc/nginx/nginx.conf