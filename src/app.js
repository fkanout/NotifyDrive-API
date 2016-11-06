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
        console.log(ctx.request.body);
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
        const userCreated = await User.create({
            email: ctx.request.body.email,
            password: bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10))
        });
        ctx.assert(userCreated, 500, 'User not created');
        ctx.status = 201;
        await next;
    });
router.get(
    '/checktoken',
    async function (ctx, next) {
        const authorization = ctx.request.headers.authorization;
        ctx.assert(authorization, 401, 'Not correct header');
        try{
            await jwt.verify(authorization);
        } catch (err){
            ctx.assert(null, 401, 'Not valid token');
        }
        ctx.body ={
            validToken: true
        };
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
            // mark: ctx.request.body.mark,
            // year: ctx.request.body.year,
            // model: ctx.request.body.model,
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
    '/static/department',
    async function (ctx, next) {
        ctx.body = Dep;
        await next;
    }
);

app.listen(3003);
