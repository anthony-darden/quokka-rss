FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build

FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
