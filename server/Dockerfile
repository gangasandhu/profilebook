FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash

COPY . .

RUN chmod +x wait-for-it.sh && npm ci

EXPOSE 3000

CMD ["sh", "-c", "./wait-for-it.sh redis:6379 -- ./wait-for-it.sh db:5432 -- npm start"]

