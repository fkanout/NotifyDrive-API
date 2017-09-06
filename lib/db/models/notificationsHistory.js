const mongoose = require("mongoose");
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
    geoLocation: { 
        lat: Number, 
        log: Number,
        fullAddress: Object,
        formatedAddress: String
    }


});

module.exports = mongoose.model('NotificationsHistory', NotificationsHistory);
