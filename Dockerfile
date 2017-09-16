FROM node:8.4.0

MAINTAINER FaisalKANOUT

RUN mkdir -p /home/notifydriver/API

WORKDIR /home/notifydriver/API

COPY package.json /home/notifydriver/API

RUN npm install

COPY . /home/notifydriver/API

ENV PORT=3003

ENV MONGO_DB_URL=mongodb://ndmongo:27017/db_notifydriver

ENV MONGO_DB_URL_TEST=mongodb://ndmongo:27017/db_notifydriver_test

ENV PASSPHRASE=1234567890SECRET

ENV AMQP=amqp://notifydriver:writeread@ndrabbitmq:5672/notifydriver

ENV QUEUE=pushNotification

ENV ENV=DEV

ENV NODE_ENV=DEV

EXPOSE 3003

CMD [ "npm", "start" ]


