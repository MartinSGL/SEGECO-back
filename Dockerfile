FROM node:20-alpine3.19 as dev
WORKDIR /app
COPY package.json ./
RUN yarn install
CMD ["yarn","start:dev"]

FROM node:20-alpine3.19 as deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:20-alpine3.19 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM node:20-alpine3.19 as prod-deps
WORKDIR /app
COPY package.json ./ 
RUN npm install --prod

FROM node:20-alpine3.19 as runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
CMD ["node","app.js"]