FROM node:8.4.0

MAINTAINER FaisalKANOUT

RUN rm -Rf /Users/javascript/NotifyDriver-API

RUN mkdir -p /Users/javascript/NotifyDriver-API

WORKDIR /Users/javascript/NotifyDriver-API

COPY package.json /Users/javascript/NotifyDriver-API

RUN npm install

COPY . /Users/javascript/NotifyDriver-API

ENV PORT=3003

ENV MONGO_DB_URL=mongodb://ndmongo:27017/db_notifydriver

ENV MONGO_DB_URL_TEST=mongodb://ndmongo:27017/db_notifydriver_test

ENV PASSPHRASE=1234567890SECRET

ENV AMQP=amqp://notifydriver:writeread@ndrabbitmq:5672/

ENV QUEUE=pushNotification

ENV ENV=DEV

ENV NODE_ENV=DEV

EXPOSE 3003

CMD [ "npm", "start" ]


