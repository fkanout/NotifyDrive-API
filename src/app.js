/**
 * Created by javascript on 24/09/2016.
 */

"use strict";
import detenv from 'dotenv'; detenv.config();
import 'babel-polyfill';
import Koa from 'koa';
const router = require('koa-router')();
const app = new Koa();
import bcrypt from 'bcrypt';
const auth = require('./helpers/auth');
const bodyParser = require('koa-bodyparser');
const rpn = require('request-promise-native');

require ('./db/connection');

const User = require('./db/models/user');
const Car = require('./db/models/car');
const NotificationsHistory = require('./db/models/notificationsHistory');

const Device = require('./db/models/device');
const AMQP = require('./helpers/amqp');
const imageCRM = require('./helpers/imageCRM').imageCRM;

const Dep = require('./db/static');
const proxy = require('koa-proxy');

const getAddress = require('./helpers/getAddress');
const jwt = require('./helpers/jwt');
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
router.post(
    '/signin',
    async function (ctx, next) {
        //  await Rx.Observable.fromPromise(User.findOne({ email: ctx.request.body.email }))
        // .subscribe(
        //     res => ctx.body = res,
        //     err => ctx.assert(null, 403),
        //     ()  => console.log('done')
        // );
        const user = await User.findOne({ email: ctx.request.body.email });
        ctx.assert(user,401);
        const password = bcrypt.compareSync(ctx.request.body.password, user.password);
        ctx.assert(password, 401, 'Wrong password');
        const token = jwt.sign({ userId: user._id });
        ctx.assert(token, 500, 'Token problem');
        var deviceQuery = { deviceInfo: { uuid: ctx.request.body.device.uuid} } ;

        const device = await Device.findOneAndUpdate(deviceQuery, { token: ctx.request.body.deviceToken, 
                                                                    deviceInfo: ctx.request.body.device, 
                                                                    userId: user._id 
                                                                }, { new: true, upsert: true });
        console.log(device);
        ctx.body = {token: token};
        await next;
    });
router.post(
    '/signup',
    async function (ctx, next) {

        const user = await User.findOne({ email: ctx.request.body.email });
        ctx.assert(!user,409, 'User already exists');

        //******* Add new user
        const userCreated = await User.create({
            email: ctx.request.body.email,
            password: bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10))
        });
        ctx.assert(userCreated, 500, 'User not created');
        //*****

        //******* Add user device
        const userDevice = await Device.create({
            userId: userCreated._id,
            token: ctx.request.body.deviceToken
        });
        ctx.assert(userDevice, 500, 'Problem with your device');
        //*******

        const token = jwt.sign({userId: userCreated._id});
        ctx.body = {token: token};
        await next;
    });

router.get(
    '/checktoken',
    async function (ctx, next) {
        const authorization = ctx.request.headers.authorization;
        ctx.assert(authorization, 401, 'Not correct header');
        try{
            await jwt.verify(authorization);
            ctx.body = {success: true};
        } catch (err){
            ctx.assert(null, 401, 'Not valid token');
        }
        await next;
    }
);
router.post(
    '/car/search',
    async function (ctx, next) {
        const userId = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(userId, 401);
        //todo add Joi to validate body
        const plate = await Car.findOne({ plate: ctx.request.body.plate });
        ctx.assert(plate, 404);
        ctx.body = plate;
        await next;
    }
);
router.post(
    '/car/add',
    async function (ctx, next) {
        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);
        const car = await Car.findOne({ plate: ctx.request.body.plate });
        ctx.assert(!car, 409);
        //todo add Joi to validate body
        const newCarToAdd = await Car.create({
            plate:  ctx.request.body.plate,
            mark: ctx.request.body.mark,
            year: ctx.request.body.year,
            model: ctx.request.body.model,
            owner: user.userId,
            department: ctx.request.body.department
        });
        ctx.assert(newCarToAdd, 500);
        ctx.body = newCarToAdd;
        await next;
    }
);
router.post(
    '/car/request',
    async function (ctx, next) {
        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);
        const options = {
            method: 'POST',
            uri: ' https://www.oscaro.com/Catalog/SearchEngine/LicencePlateJQueryV2',
            body: {
                frenchLicencePlate: ctx.request.body.plate
            },
            json: true // Automatically stringifies the body to JSON
        };
        const requestedCar = await rpn(options);
        ctx.assert(requestedCar, 401);
        const group = requestedCar.types[0].Text.split(' ');
        ctx.body = {
            Mark: group[0],
            Model: group[1]
        };
        await next;
    }
);
router.get(
    '/car/getmycars',
    async function (ctx, next) {
        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);
        const cars = await Car.find({ owner: user.userId });
        ctx.assert(cars, 409);
        ctx.body = cars;
        await next;
    }
);
router.post(
    '/notifydriver',
    async function (ctx, next) {

        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);

        const carId = ctx.request.body.carId;
        const ownerId = ctx.request.body.ownerId;
        const msgSelected = ctx.request.body.msgSelected;
        const car = await Car.findOne({ _id: carId });
        ctx.assert(car, 404, 'Car not found');

        const carOwner = await User.findOne({ _id: ownerId });
        ctx.assert(carOwner, 404, 'Car owner not found');

        const devices = await Device.find({ userId: carOwner._id });
        ctx.assert(devices, 404, 'Car owner has no devices');
        
        let devicesId = [];
        for (let device of devices)
            if (device.token){
                await AMQP.publish(JSON.stringify({
                    token: device.token,
                    title: "Notify Driver",
                    body: `Message concernant votre voiture dons la plaque d'immatriculation est ${car.plate}: ${msgSelected}`
                }),process.env.QUEUE);
                devicesId.push(device._id);
            }
        const fullAddress = await getAddress.getAddress(ctx.request.body.lat,ctx.request.body.log);
        
        await NotificationsHistory.create({
            senderId: user.userId,
            receiverId: carOwner._id,
            sentMsg: msgSelected,
            carPlate: car.plate,
            receivedDevices: devicesId,
            geoLocation:{
                lat: ctx.request.body.lat,
                log: ctx.request.body.log,
                fullAddress: JSON.parse(fullAddress),
                formatedAddress: JSON.parse(fullAddress).results[0].formatted_address
            }
        
            });
        ctx.body = {success: true};
        await next;
    }
);

router.get(
    '/getReceivedNotifications',
    async function (ctx, next) {

        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);

        const receivedNotifications = await NotificationsHistory.find({ receiverId: user.userId });
        ctx.assert(receivedNotifications, 401);

    
        ctx.body = receivedNotifications;
        await next;
    }
);

router.post(
    '/evaluateDriver',
    async function(ctx, next){

        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);
        
        const carId = ctx.request.body.carId;
        const ownerId = ctx.request.body.ownerId;
        let car;
        
        // todo Optimisation;
        if (ctx.request.body.evaluation === "positive"){
             car = await Car.update(
                { _id: carId },
                {'$addToSet': {
                    'evaluation.positive': user.userId
                }
            });
        }else{
            car = await Car.update(
                { _id: carId },
                {'$addToSet': {
                    'evaluation.negative': user.userId
                }
            });
        }     
        ctx.assert(car, 404, 'Car not found')
        ctx.body = car;
        await next;
    }
)

router.get(
    '/getSentNotifications',
    async function (ctx, next) {

        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);
        
        const carId = ctx.request.body.carId;
        const ownerId = ctx.request.body.ownerId;

        const receivedNotifications = await NotificationsHistory.find({ senderId: user.userId });
        ctx.assert(receivedNotifications, 401);

    
        ctx.body = receivedNotifications;
        await next;
    }
);
router.post(
    '/setPosotive'
)

router.post(
    '/imagecrm',
    async function (ctx, next) {
        const user = await auth.authenticate(ctx.request.headers.authorization);
        ctx.assert(user, 401);
        const plateFromImg = await imageCRM(ctx.request.body.image);
        console.log(plateFromImg);
        ctx.body = plateFromImg;
    }
)


router.get(
    '/dep',
    async function (ctx, next) {
        ctx.body = Dep;
        await next;
    }
);
/*app.use(proxy({
  host: 'http://0.0.0.0'
}));*/
app.listen(3003);
