FROM node:20.11-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build && npm run prisma:generate
CMD npm run prisma:deploy;npm run start:prod
