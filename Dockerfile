FROM node:latest

WORKDIR /usr/src/NotifyDriver-API

COPY package.json .

RUN npm install

ENV PORT=3003

ENV MONGO_DB_URL=mongodb://localhost:27017/db_notifydriver

ENV MONGO_DB_URL_TEST=mongodb://localhost:27017/db_notifydriver_test

ENV PASSPHRASE=1234567890SECRET

ENV AMQP=amqp://notifydriver:writeread@localhost:5672/

ENV QUEUE=pushNotification

ENV ENV=DEV

ENV NODE_ENV=DEV

EXPOSE 3003

CMD [ "npm", "start" ]


