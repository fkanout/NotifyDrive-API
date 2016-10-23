/**
 * Created by javascript on 01/10/2016.
 */
'use strict';

const mongoose = require("mongoose");

const Car = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    mark: {
        type: String,
        required: false,
        index: true
    },
    year: {
        type: Number,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    addedAt:{
        type: Date,
        default: Date.now()
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    department:{
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Car', Car);

