# Specifiy image && Name it as development
FROM node:18-alpine AS development

WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-only

RUN apk add --no-cache curl
HEALTHCHECK CMD curl --fail --silent http://localhost:8080 || exit 1

CMD npm install && npm run dev

FROM node:18-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=development /app/dist ./dist/

CMD npm run dev
