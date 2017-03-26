const mongoose = require("mongoose");
var GeoJSON = require('mongoose-geojson-schema');

const NotificationsHistory = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sentMsg: {
        type: String,
    },
    sentDate: {
        type: Date,
        default: new Date()
    },
    carPlate: {
        type: String,
        required: true,
        index: true,
    },
    receivedDevices: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        }],
    geoLocation: mongoose.Schema.Types.Point,
});

module.exports = mongoose.model('NotificationsHistory', NotificationsHistory);
