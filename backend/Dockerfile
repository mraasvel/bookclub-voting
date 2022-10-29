# Specifiy image && Name it as development
FROM node:18-alpine AS development

WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

RUN apk add --no-cache curl
HEALTHCHECK CMD curl --silent --fail http://localhost:3000/health | grep 'status":"ok"' || exit 1

CMD npm install && npm run start:dev


FROM node:18-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=development /app/dist ./dist/

EXPOSE 3000
CMD npm run start:prod
