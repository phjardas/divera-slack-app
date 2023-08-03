FROM node:18.17.0-alpine3.18

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

ENV DEBUG=* \
  NODE_ENV=production
CMD ["node", "dist/index.js"]
