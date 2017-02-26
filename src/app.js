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
const Device = require('./db/models/device');
const AMQP = require('./helpers/amqp');
const Dep = require('./db/static');


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
        const cars = await Car.find({ owner: user._id });
        ctx.assert(car, 409);
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

        for (let deviceToken of devices)
            if (deviceToken.token)
                await AMQP.publish(JSON.stringify({
                    token: deviceToken.token,
                    title: "Notify Driver",
                    body: `Message concernant votre voiture dons la plaque d'immatriculation est ${car.plate}: ${msgSelected}`
                }),process.env.QUEUE);

        ctx.body = {success: true};
        await next;
    }
);


router.get(
    '/static/department',
    async function (ctx, next) {
        ctx.body = Dep;
        await next;
    }
);

app.listen(3003);
