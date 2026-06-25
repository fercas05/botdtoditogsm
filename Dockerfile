# Image size ~ 400MB
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache git \
    && npm install

COPY . .
RUN npm run build

FROM node:22-alpine AS deploy

WORKDIR /app

ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY .env ./

RUN apk add --no-cache git \
    && npm install --production \
    && npm cache clean --force \
    && addgroup -g 1001 -S nodejs && adduser -S -u 1001 nodejs \
    && chown -R nodejs:nodejs /app \
    && rm -rf /root/.npm /root/.node-gyp /tmp/*

USER nodejs

CMD ["npm", "start"]
