const { nextISSTimesForMyLocation } = require('./iss_promised');
const { flyOverDates } = require('./index.js');

// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then(body =>
//     console.log(body));
  
nextISSTimesForMyLocation()
.then ((flyOverTimes) => {
  flyOverDates(flyOverTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});


//Getting a final value of "Next pass at Invalid Date for undefined seconds!" - too tired to figure this out right now. 