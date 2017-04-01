'use strict';
const rpn = require('request-promise-native');
export const getAddress =  async (lat, log) => await rpn(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&sensor=false`);

// const image =  await rpn(`https://api.mapbox.com/styles/v1/faisalkanout/cj0r4j20r00le2rt85lleqxln/static/${log},${lat},17.64,0.00,0.00/600x400?access_token=pk.eyJ1IjoiZmFpc2Fsa2Fub3V0IiwiYSI6ImNqMHIzM3kxaDAwMGsycW5wOTV6dzQ3cmsifQ.MFSkbBqaKfGk9MFXbGoAtg`);
//  return new Buffer(image)
// return new Buffer(image).toString('base64');