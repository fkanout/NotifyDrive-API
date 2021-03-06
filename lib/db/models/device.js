/**
 * Created by JS on 25/12/2016.
 */


const mongoose = require('mongoose');

const Device = new mongoose.Schema({
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
    required: false,
  },
  deviceInfo: Object,
});

module.exports = mongoose.model('Device', Device);

