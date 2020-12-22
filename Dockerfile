# This is a multistep process: build phase and run phase.

# BUILD PHASE
FROM node:12.20.0-alpine3.10 AS builder
WORKDIR '/app'
# Install dependencies via apk
RUN apk update \
  && apk add \
  python \
  g++ \
  make \
  && rm -rf /var/cache/apk/*
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build
# /app/build will be the result that I want.

# RUN PHASE
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
