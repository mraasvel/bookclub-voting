# Specifiy image && Name it as development
FROM node:18 AS development

WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-only

CMD npm install && npm run dev

FROM node:18 AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install  --omit=dev
COPY . .
COPY --from=development /app/dist ./dist/

CMD npm run dev
