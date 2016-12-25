/**
 * Created by JS on 25/12/2016.
 */

'use strict';

const mongoose = require("mongoose");

const Device = new mongoose.Schema({
    addedAt:{
        type: Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Device', Device);

