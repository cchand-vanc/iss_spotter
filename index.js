const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Fetching the IP didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP("172.218.5.68", (error, coords) => {
  if (error) {
    console.log("Fetching the coordinates didn't work!", error);
    return;
  }

  console.log('It worked! Returned coordinates:', coords);
});

fetchISSFlyOverTimes({ latitude: 49.2827291, longitude: -123.1207375 }, (error, flyOverTimes) => {
  if (error) {
    console.log("Fetching the fly-over times didn't work ", error);
    return;
  }

  console.log("It worked! Returned fly-over times: ", flyOverTimes);
});