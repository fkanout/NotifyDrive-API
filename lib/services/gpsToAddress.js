const httpRequest = require('request-promise-native');

module.exports = async (lat, log) => {
  const httpReqOptions = {
    method: 'POST',
    uri: process.env.GPSTOADDRESS_URL || 'http://localhost:9999/geolocation',
    body: {
      task: process.env.GPSTOADDRESS_TASK || 'geolocation',
      gps: {
        lat: parseFloat(lat),
        log: parseFloat(log),
      },
    },
    json: true,
  };
  let res;
  try {
    res = await httpRequest(httpReqOptions);
  } catch (err) {
    res = { address: 'unlocated' };
  }
  return res.address;
};
