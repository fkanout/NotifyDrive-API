/**
 * Created by javascript on 24/09/2016.
 */
'use strict';

const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);
