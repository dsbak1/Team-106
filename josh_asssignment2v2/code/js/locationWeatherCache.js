// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value) {
        return ("0" + value).slice(-2);
    };
    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    return dateString;
};

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
};

// Code for LocationWeatherCache class and other shared code.
// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";
// This is where we'll save/load the locationWeatherCache object
var LOCATION_WEATHER_CACHE_STORAGE = APP_PREFIX + "-locationWeatherCache"
var API_KEY = "6979e4c00b693d0a3ef2ddb64e6a94ab";
function LocationWeatherCache() {
    // Private attributes:
    var locations = [];
    var callbacks = {};
    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
  	this.length = function() {
    		return locations.length
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
        if (index < locations.length) {
          return locations[index];
        } else {
            console.log("No location at index!")
            return null
        }
    };
    
    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname) {
        // Create the new location object	
        var newLocation = {
          nickname: nickname, 
          latitude: latitude, 
          longitude: longitude,
          forecasts: {}
        };
        console.log("Adding location:" + JSON.stringify(newLocation));

        // Push new location onto the end of the locations array
        var newLength = locations.push(newLocation);

        // The new location will be at the end of the array
        return newLength - 1;
    };
    
    // Removes the saved location at the given index.
  	//
  	this.removeLocationAtIndex = function(index) {
        if (index < locations.length) {
          locations.splice(index, 1);
        } else {
          console.log("Can't remove saved location at given index")
        }
    };
  
    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
      	return { locations: locations };
    };
  
    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        locations = locationWeatherCachePDO.locations;
    };
  
    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
  
    this.getWeatherAtIndexForDate = function(index, date, callback) {
      	var location = this.locationAtIndex(index);
        var property = location.latitude + "," + location.longitude + "," + date.forecastDateString();
      	if (location.forecasts.hasOwnProperty(property)) {
          	// If the location and date are cached return immediately
          	callback(index, locations[index].forecasts[property])
        } else {
            // Save the callback function into the callbacks object
            callbacks[property] = callback;
            // Execute the jsonp request
            var url = 'https://api.forecast.io/forecast/';
            var script = document.createElement('script');
            script.src = url + API_KEY + '/' + property + '/?units=si&exclude=["hourly","minutely","currently","flags"]&callback="locationWeatherCache.weatherResponse"';
            document.body.appendChild(script);
        }
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
        var formattedTime = (new Date(response.daily.data[0].time*1000)).forecastDateString();
        var key = response.latitude + "," + response.longitude + "," + formattedTime;
        var index = indexForLocation(response.latitude, response.longitude);
        locations[index].forecasts[key] = response;
        saveLocations();
        
        var callback = callbacks[key];
        callback(index, response);
    };
    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude) {
      	for (var index = 0; index < locations.length; index++) {
          	if (locations[index].latitude == latitude && locations[index].longitude == longitude) {
                return index
            }
        }
        return -1;
    }
};

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations() {
  	// Initialise global variable
  	locationWeatherCache = new LocationWeatherCache()
    
    // Try loading from local storage
    var locationWeatherCacheJSON = localStorage.getItem(LOCATION_WEATHER_CACHE_STORAGE);
  	if (locationWeatherCacheJSON != null) {
        // Item found in local storage, so let's load it
        locationWeatherCache.initialiseFromPDO(
            JSON.parse(locationWeatherCacheJSON)
        );
        console.log("Loaded locationWeatherCache")
    } else {
        console.log("Couldn't load locationWeatherCache")
    }
}
loadLocations();

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations() {
    localStorage.setItem(
        LOCATION_WEATHER_CACHE_STORAGE, JSON.stringify(locationWeatherCache)
    );
    console.log("Saved locationsWeatherCache")
};