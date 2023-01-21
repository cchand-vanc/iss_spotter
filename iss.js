const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
*/



const fetchMyIP = function(callback) {
  let url = "https://api.ipify.org/?format=json";

  request(url, (error, response, body) => {
    if (error) {
      return ('error:', error);
    }
    const ip = JSON.parse(body).ip;
    // console.log(data["ip"])
    if (ip) {
      callback(null, ip);
    } else {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200)  {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = `http://ipwho.is/${ip}`;

  request(url, (error, response, body) => {
    if (error) {
      return ('error: ', error);
    }
    const coords = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };

    if (coords) {
      callback(null, coords);
    }

    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      return ('error: ', error);
    }
    const flyOverTimes = [JSON.parse(body).response];
    
    if (flyOverTimes) {
      callback(null, flyOverTimes);
    } else {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly-over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

  });
};

const nextISSTimesForMyLocation = function(callback) {
 
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyOverTimes);
      });
    });
  });
};



module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes
  nextISSTimesForMyLocation
};


